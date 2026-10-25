import { notFound, redirect } from "next/navigation";
import {
  EMAIL_AUTH_ENABLED,
  EMAIL_VERIFICATION_DISABLED,
  IS_FORMBRICKS_CLOUD,
  IS_TURNSTILE_CONFIGURED,
  OIDC_DISPLAY_NAME,
  PRIVACY_URL,
  SIGNUP_ENABLED,
  TERMS_URL,
  TURNSTILE_SITE_KEY,
  WEBAPP_URL,
} from "@/lib/constants";
import { verifyInviteToken } from "@/lib/jwt";
import { getOrganizationsByUserId } from "@/lib/organization/service";
import { getUser } from "@/lib/user/service";
import { findMatchingLocale } from "@/lib/utils/locale";
import { getUserWorkspaces } from "@/lib/workspace/service";
import { FormWrapper } from "@/modules/auth/components/form-wrapper";
import { getSession } from "@/modules/auth/lib/session";
import { getIsValidInviteToken } from "@/modules/auth/signup/lib/invite";
import { getIsMultiOrgEnabled } from "@/modules/ee/license-check/lib/utils";
import { getSsoAvailability, toSsoFormProps } from "@/modules/ee/sso/lib/sso-availability";
import { SignupForm } from "./components/signup-form";

export const SignupPage = async ({
  searchParams: searchParamsProps,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
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
      // Continue to render signup form if workspace resolution fails
    }
  }

  if (targetHref) {
    return redirect(targetHref);
  }

  const searchParams = await searchParamsProps;
  const inviteToken = searchParams["inviteToken"] ?? null;
  const [isMultOrgEnabled, ssoAvailability] = await Promise.all([
    getIsMultiOrgEnabled(),
    getSsoAvailability(),
  ]);
  const locale = await findMatchingLocale();
  if (!SIGNUP_ENABLED || !isMultOrgEnabled) {
    if (!inviteToken) notFound();

    try {
      const { inviteId } = verifyInviteToken(inviteToken);
      const isValidInviteToken = await getIsValidInviteToken(inviteId);

      if (!isValidInviteToken) notFound();
    } catch {
      notFound();
    }
  }

  const emailFromSearchParams = searchParams["email"];

  return (
    <FormWrapper activeTab="signup">
      <SignupForm
        webAppUrl={WEBAPP_URL}
        termsUrl={TERMS_URL}
        privacyUrl={PRIVACY_URL}
        emailVerificationDisabled={EMAIL_VERIFICATION_DISABLED}
        emailAuthEnabled={EMAIL_AUTH_ENABLED}
        {...toSsoFormProps(ssoAvailability)}
        oidcDisplayName={OIDC_DISPLAY_NAME}
        userLocale={locale}
        emailFromSearchParams={emailFromSearchParams}
        isTurnstileConfigured={IS_TURNSTILE_CONFIGURED}
        turnstileSiteKey={TURNSTILE_SITE_KEY}
        isFormbricksCloud={IS_FORMBRICKS_CLOUD}
      />
    </FormWrapper>
  );
};
