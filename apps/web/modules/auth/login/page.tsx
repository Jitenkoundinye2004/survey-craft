import { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  EMAIL_AUTH_ENABLED,
  OIDC_DISPLAY_NAME,
  PASSWORD_RESET_DISABLED,
  SIGNUP_ENABLED,
  WEBAPP_URL,
} from "@/lib/constants";
import { getOrganizationsByUserId } from "@/lib/organization/service";
import { getUser } from "@/lib/user/service";
import { getUserWorkspaces } from "@/lib/workspace/service";
import { FormWrapper } from "@/modules/auth/components/form-wrapper";
import {
  getInviteTokenFromCallbackUrl,
  getRelativeCallbackUrl,
  getSearchParamString,
  resolveAuthCallbackUrl,
} from "@/modules/auth/lib/callback-url";
import { getSession } from "@/modules/auth/lib/session";
import { getIsMultiOrgEnabled } from "@/modules/ee/license-check/lib/utils";
import { getSsoAvailability, toSsoFormProps } from "@/modules/ee/sso/lib/sso-availability";
import { LoginForm } from "./components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Open-source Experience Management. Free & open source.",
};

export const LoginPage = async ({
  searchParams: searchParamsProps,
}: Readonly<{
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}>) => {
  let targetHref: string | null = null;
  const session = await getSession();

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
      // Continue to render login form if workspace resolution fails
    }
  }

  if (targetHref) {
    return redirect(targetHref);
  }

  const [isMultiOrgEnabled, ssoAvailability, searchParams] = await Promise.all([
    getIsMultiOrgEnabled(),
    getSsoAvailability(),
    searchParamsProps,
  ]);
  const oauthError = getSearchParamString(searchParams.error);

  const resolvedCallbackUrl =
    resolveAuthCallbackUrl({
      searchParamCallbackUrl: searchParams.callbackUrl,
      webAppUrl: WEBAPP_URL,
    }) ?? WEBAPP_URL;
  const resolvedCallbackPath = getRelativeCallbackUrl(resolvedCallbackUrl, WEBAPP_URL);
  const inviteToken = getInviteTokenFromCallbackUrl(resolvedCallbackUrl, WEBAPP_URL);

  return (
    <FormWrapper>
      <LoginForm
        emailAuthEnabled={EMAIL_AUTH_ENABLED}
        publicSignUpEnabled={SIGNUP_ENABLED}
        passwordResetEnabled={!PASSWORD_RESET_DISABLED}
        {...toSsoFormProps(ssoAvailability)}
        oidcDisplayName={OIDC_DISPLAY_NAME}
        isMultiOrgEnabled={isMultiOrgEnabled}
        oauthError={oauthError}
        // ENG-2562: set when a verification succeeded but the session was withheld, because the
        // browser presenting the link was not the one that signed up. Without it the user is bounced
        // here with no explanation right after being told their address was verified.
        emailJustVerified={getSearchParamString(searchParams.verified) === "1"}
        prefilledEmail={getSearchParamString(searchParams.email)}
        inviteToken={inviteToken}
        resolvedCallbackPath={resolvedCallbackPath}
        resolvedCallbackUrl={resolvedCallbackUrl}
      />
    </FormWrapper>
  );
};
