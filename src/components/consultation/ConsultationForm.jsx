import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLanguage } from "../../i18n/LanguageContext";
import { submitConsultation } from "../../lib/sheetActions";
import DatePicker from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";

const DatePickerComponent = DatePicker?.default || DatePicker;
const arabicCalendar = arabic?.default || arabic;
const arabicLocale = arabic_ar?.default || arabic_ar;

function Field({ label, required, optional, error, children }) {
  const { t } = useLanguage();
  return (
    <div className="block">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          {label}
          {required && (
            <span className="text-red-500 font-bold ms-1" title="مطلوب / Required">
              *
            </span>
          )}
          {optional && (
            <span className="text-xs text-muted-foreground font-normal ms-1.5">
              {t("common.optional")}
            </span>
          )}
        </span>
      </div>
      {children}
      {error && (
        <span className="mt-1 block text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
}

const getInputCls = (hasError) =>
  `w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition ${
    hasError
      ? "border-red-500 ring-2 ring-red-500/20"
      : "border-border focus:border-gold focus:ring-2 focus:ring-gold/20"
  }`;

export function ConsultationForm() {
  const { t } = useLanguage();
  const f = t("consultation.form");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const datePickerRef = useRef();
  const [utmSource, setUtmSource] = useState("");
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    salary: "",
    dob: "",
    employer: "",
    rank: "",
    support: "",
    obligations: "",
    privacy: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsMounted(true);
    // Capture UTM source from URL or sessionStorage
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = params.get("utm_source");
      if (utm) {
        setUtmSource(utm);
        sessionStorage.setItem("utm_source", utm);
      } else {
        const stored = sessionStorage.getItem("utm_source");
        if (stored) setUtmSource(stored);
      }
    } catch {}
  }, []);

  const set = (k) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) {
      setErrors((errs) => ({ ...errs, [k]: "" }));
    }
  };

  const handleMobileChange = (e) => {
    const val = e.target.value
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
      .replace(/\D/g, "")
      .slice(0, 10);
    setValues((v) => ({ ...v, mobile: val }));
    if (errors.mobile) {
      setErrors((errs) => ({ ...errs, mobile: "" }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!values.name.trim()) newErrors.name = t("common.required");
    if (!values.mobile.trim()) {
      newErrors.mobile = t("common.required");
    } else if (values.mobile.trim().length !== 10) {
      newErrors.mobile = t("common.invalidPhone");
    }
    if (!values.salary.trim()) newErrors.salary = t("common.required");
    if (!values.dob) newErrors.dob = t("common.required");
    if (!values.employer) newErrors.employer = t("common.required");
    if (!values.support) newErrors.support = t("common.required");
    if (!values.privacy) newErrors.privacy = t("common.required");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(t("common.fillRequired"));
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await submitConsultation({ data: { ...values, utmSource } });
      toast.success(t("common.successToast"));
      setValues({
        name: "",
        mobile: "",
        salary: "",
        dob: "",
        employer: "",
        rank: "",
        support: "",
        obligations: "",
        privacy: false,
      });
    } catch (err) {
      console.error(err);
      toast.error(t("common.required"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid gap-5 rounded-3xl border border-border/60 bg-card p-6 shadow-elegant sm:p-10 md:grid-cols-2"
    >
      <Field label={f.name} required error={errors.name}>
        <input
          className={getInputCls(!!errors.name)}
          placeholder={f.namePlaceholder}
          value={values.name}
          onChange={set("name")}
        />
      </Field>

      <Field label={f.mobile} required error={errors.mobile}>
        <input
          className={getInputCls(!!errors.mobile)}
          placeholder={f.mobilePlaceholder}
          value={values.mobile}
          onChange={handleMobileChange}
          maxLength={10}
          inputMode="numeric"
          type="tel"
        />
      </Field>

      <Field label={f.salary} required error={errors.salary}>
        <input
          className={getInputCls(!!errors.salary)}
          placeholder={f.salaryPlaceholder}
          value={values.salary}
          onChange={set("salary")}
          inputMode="numeric"
        />
      </Field>

      <Field label={f.dob} required error={errors.dob}>
        {isMounted ? (
          <DatePickerComponent
            ref={datePickerRef}
            value={values.dob}
            onChange={(date) => {
              const formatted = date ? date.format() : "";
              setValues((v) => ({ ...v, dob: formatted }));
              if (errors.dob) setErrors((errs) => ({ ...errs, dob: "" }));
              datePickerRef.current?.closeCalendar();
            }}
            calendar={arabicCalendar}
            locale={arabicLocale}
            inputClass={getInputCls(!!errors.dob)}
            containerClassName="w-full"
            placeholder={f.dob}
          />
        ) : (
          <input className={getInputCls(!!errors.dob)} placeholder={f.dob} readOnly />
        )}
      </Field>

      <Field label={f.employer} required error={errors.employer}>
        <select
          className={getInputCls(!!errors.employer)}
          value={values.employer}
          onChange={set("employer")}
        >
          <option value="">{t("common.selectPlaceholder")}</option>
          <option value="GOVERNMENT">{f.employerOptions.GOVERNMENT}</option>
          <option value="MILITARY">{f.employerOptions.MILITARY}</option>
          <option value="PRIVATE">{f.employerOptions.PRIVATE}</option>
          <option value="SELFEMPLOYED">{f.employerOptions.SELFEMPLOYED}</option>
          <option value="RENT">{f.employerOptions.RENT}</option>
        </select>
      </Field>

      <Field label={f.rank} optional>
        <input
          className={getInputCls(false)}
          placeholder={f.rankPlaceholder}
          value={values.rank}
          onChange={set("rank")}
        />
      </Field>

      <Field label={f.support} required error={errors.support}>
        <select
          className={getInputCls(!!errors.support)}
          value={values.support}
          onChange={set("support")}
        >
          <option value="">{t("common.selectPlaceholder")}</option>
          <option value="supported">{f.supportOptions.supported}</option>
          <option value="unsupported">{f.supportOptions.unsupported}</option>
          <option value="beneficiary">{f.supportOptions.beneficiary}</option>
        </select>
      </Field>

      <Field label={f.obligations} optional>
        <input
          className={getInputCls(false)}
          placeholder={f.obligationsPlaceholder}
          value={values.obligations}
          onChange={set("obligations")}
          inputMode="numeric"
        />
      </Field>

      <div className="md:col-span-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className={`mt-1 h-4 w-4 accent-[color:var(--gold)] ${errors.privacy ? "ring-2 ring-red-500" : ""}`}
            checked={values.privacy}
            onChange={set("privacy")}
          />
          <span
            className={`text-sm ${errors.privacy ? "text-red-500 font-medium" : "text-muted-foreground"}`}
          >
            {f.privacy} <span className="text-red-500 font-bold">*</span>
          </span>
        </label>
        {errors.privacy && (
          <span className="mt-1 block text-xs font-medium text-red-500 animate-in fade-in">
            {errors.privacy}
          </span>
        )}
      </div>

      <div className="md:col-span-2">
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
        >
          {loading ? t("common.loading") : t("common.submit")}
        </motion.button>
      </div>
    </motion.form>
  );
}
