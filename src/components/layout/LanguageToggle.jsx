import { Globe } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export function LanguageToggle({ className = "" }) {
  const { toggleLang, t } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLang}
      className={`group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm font-medium text-foreground backdrop-blur transition hover:border-accent hover:text-accent ${className}`}
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4 transition group-hover:rotate-12" />
      <span>{t("common.langSwitch")}</span>
    </button>
  );
}
