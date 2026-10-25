import "server-only";
import { createClient } from "redis";
import { logger } from "@formbricks/logger";
import { getRedisTlsOptions } from "@formbricks/redis-config";
import { env } from "@/lib/env";
import { getAuthRedisReconnectDelay } from "./redis-reconnect";

type RedisClient = ReturnType<typeof createClient>;

let clientPromise: Promise<RedisClient> | undefined;
let activeClient: RedisClient | undefined;
let supportsGetDel = true;
let hasLoggedRedisFallback = false;

const memoryStore = new Map<string, { value: string; expiresAt?: number }>();

const memorySecondaryStorage = {
  get: async (key: string): Promise<string | null> => {
    const entry = memoryStore.get(key);
    if (!entry) return null;
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      memoryStore.delete(key);
      return null;
    }
    return entry.value;
  },
  set: async (key: string, value: string, ttl?: number): Promise<void> => {
    memoryStore.set(key, {
      value,
      expiresAt: ttl ? Date.now() + ttl * 1000 : undefined,
    });
  },
  delete: async (key: string): Promise<void> => {
    memoryStore.delete(key);
  },
  getAndDelete: async (key: string): Promise<string | null> => {
    const entry = memoryStore.get(key);
    if (!entry) return null;
    memoryStore.delete(key);
    if (entry.expiresAt && Date.now() > entry.expiresAt) return null;
    return entry.value;
  },
  increment: async (key: string, ttl: number): Promise<number> => {
    const entry = memoryStore.get(key);
    let count = 1;
    if (entry && (!entry.expiresAt || Date.now() <= entry.expiresAt)) {
      count = (Number(entry.value) || 0) + 1;
    }
    memoryStore.set(key, {
      value: String(count),
      expiresAt: Date.now() + ttl * 1000,
    });
    return count;
  },
};

const GET_AND_DELETE_SCRIPT = `local value = redis.call('GET', KEYS[1])
if value then redis.call('DEL', KEYS[1]) end
return value`;

const isGetDelUnsupportedError = (error: unknown): boolean => {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  return message.includes("unknown command") && message.includes("getdel");
};

const getClient = async (): Promise<RedisClient | null> => {
  if (activeClient && !activeClient.isOpen) clientPromise = undefined;
  if (!clientPromise) {
    const redisUrl = env.REDIS_URL;
    if (!redisUrl) return null;
    try {
      const tls = getRedisTlsOptions(redisUrl, env.REDIS_TLS_CA);
      const client = createClient({
        url: redisUrl,
        socket: {
          ...(tls && { tls: true as const, ...tls }),
          connectTimeout: 2000,
          reconnectStrategy: getAuthRedisReconnectDelay,
        },
        pingInterval: 300_000,
      });
      activeClient = client;
      client.on("error", (error) => {
        if (!hasLoggedRedisFallback) {
          logger.warn({ error: error.message }, "Redis connection error; auth using in-memory fallback");
          hasLoggedRedisFallback = true;
        }
      });
      clientPromise = client
        .connect()
        .then(() => client)
        .catch((error) => {
          clientPromise = undefined;
          if (!hasLoggedRedisFallback) {
            logger.warn({ error: error.message }, "Failed to connect to Redis; auth using in-memory fallback");
            hasLoggedRedisFallback = true;
          }
          return null as unknown as RedisClient;
        });
    } catch {
      return null;
    }
  }
  return clientPromise;
};

export const redisSecondaryStorage = {
  get: async (key: string): Promise<string | null> => {
    try {
      const client = await getClient();
      if (!client || !client.isOpen) return memorySecondaryStorage.get(key);
      return await client.get(key);
    } catch {
      return memorySecondaryStorage.get(key);
    }
  },
  set: async (key: string, value: string, ttl?: number): Promise<void> => {
    try {
      const client = await getClient();
      if (!client || !client.isOpen) return memorySecondaryStorage.set(key, value, ttl);
      if (ttl === undefined) {
        await client.set(key, value);
      } else {
        await client.set(key, value, { EX: ttl });
      }
    } catch {
      return memorySecondaryStorage.set(key, value, ttl);
    }
  },
  delete: async (key: string): Promise<void> => {
    try {
      const client = await getClient();
      if (!client || !client.isOpen) return memorySecondaryStorage.delete(key);
      await client.del(key);
    } catch {
      return memorySecondaryStorage.delete(key);
    }
  },
  getAndDelete: async (key: string): Promise<string | null> => {
    try {
      const client = await getClient();
      if (!client || !client.isOpen) return memorySecondaryStorage.getAndDelete(key);
      if (supportsGetDel) {
        try {
          return await client.getDel(key);
        } catch (error) {
          if (!isGetDelUnsupportedError(error)) throw error;
          supportsGetDel = false;
        }
      }
      const value = await client.eval(GET_AND_DELETE_SCRIPT, { keys: [key], arguments: [] });
      return typeof value === "string" ? value : null;
    } catch {
      return memorySecondaryStorage.getAndDelete(key);
    }
  },
  increment: async (key: string, ttl: number): Promise<number> => {
    try {
      const client = await getClient();
      if (!client || !client.isOpen) return memorySecondaryStorage.increment(key, ttl);
      const count = await client.eval(
        `local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return count`,
        { keys: [key], arguments: [String(ttl)] }
      );
      return Number(count);
    } catch {
      return memorySecondaryStorage.increment(key, ttl);
    }
  },
};
