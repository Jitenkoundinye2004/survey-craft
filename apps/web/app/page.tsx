import { LandingPage } from "@/app/components/landing-page";
import { getOrganizationsByUserId } from "@/lib/organization/service";
import { getUser } from "@/lib/user/service";
import { getUserWorkspaces } from "@/lib/workspace/service";
import { getSession } from "@/modules/auth/lib/session";

export const dynamic = "force-dynamic";

const Page = async () => {
  const session = await getSession();
  let workspaceHref = "/auth/login";
  let isAuthenticated = false;

  if (session?.user?.id) {
    try {
      const user = await getUser(session.user.id);
      if (user) {
        isAuthenticated = true;
        const userOrganizations = await getOrganizationsByUserId(session.user.id);
        if (userOrganizations.length > 0) {
          const workspaces = await getUserWorkspaces(user.id, userOrganizations[0].id);
          if (workspaces.length > 0) {
            workspaceHref = `/workspaces/${workspaces[0].id}/surveys`;
          }
        }
      }
    } catch {
      // If error resolving workspace, fall back to login
      workspaceHref = "/auth/login";
    }
  }

  return <LandingPage workspaceHref={workspaceHref} isAuthenticated={isAuthenticated} />;
};

export default Page;
