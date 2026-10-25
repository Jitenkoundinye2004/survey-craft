import { useTranslation } from "react-i18next";
import { FB_PART } from "@formbricks/survey-ui/parts";

export function FormbricksBranding() {
  const { t } = useTranslation();
  return (
    <span className="flex justify-center">
      <a
        data-fb-part={FB_PART.branding}
        href="/"
        target="_blank"
        rel="noopener">
        <p className="text-signature text-xs">
          {t("common.powered_by")}{" "}
          <b>
            <span className="text-branding-text hover:text-signature">SurveyCraft</span>
          </b>
        </p>
      </a>
    </span>
  );
}
