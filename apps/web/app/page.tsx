import { redirect } from "next/navigation";
import { LandingPage } from "@/app/components/landing-page";
import { getOrganizationsByUserId } from "@/lib/organization/service";
import { getUser } from "@/lib/user/service";
import { getUserWorkspaces } from "@/lib/workspace/service";
import { getSession } from "@/modules/auth/lib/session";

export const dynamic = "force-dynamic";

const Page = async () => {
  const session = await getSession();
  let targetHref: string | null = null;

  if (session?.user?.id) {
    try {
      const user = await getUser(session.user.id);
      if (user) {
        const userOrganizations = await getOrganizationsByUserId(session.user.id);
        if (userOrganizations.length > 0) {
          const workspaces = await getUserWorkspaces(user.id, userOrganizations[0].id);
          if (workspaces.length > 0) {
            targetHref = `/workspaces/${workspaces[0].id}/surveys`;
          }
        }
      }
    } catch {
      // Fall through to landing page if session resolution fails
    }
  }

  if (targetHref) {
    return redirect(targetHref);
  }

  return <LandingPage workspaceHref="/auth/login" isAuthenticated={false} />;
};

export default Page;
