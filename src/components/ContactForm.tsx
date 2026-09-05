import { useState, type FormEvent } from "react";
import { engagementTypes, technicalDomains } from "@/lib/content";

const endpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT;

const inputClass =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-heading placeholder:text-body/60 outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("full_name") ?? "").trim();
    const workEmail = String(data.get("work_email") ?? "").trim();
    const companyName = String(data.get("company_name") ?? "").trim();
    const engagementType = String(data.get("engagement_type") ?? "");
    const projectSpecs = String(data.get("project_specs") ?? "").trim();
    const domains = data.getAll("technical_domains");

    if (fullName.length < 2) {
      setStatus("error");
      setMessage("Please enter your full name.");
      return;
    }
    if (!workEmail.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid work email.");
      return;
    }
    if (!companyName) {
      setStatus("error");
      setMessage("Company name is required.");
      return;
    }
    if (!engagementType) {
      setStatus("error");
      setMessage("Please select an engagement model.");
      return;
    }
    if (domains.length === 0) {
      setStatus("error");
      setMessage("Please select at least one technical domain.");
      return;
    }
    if (projectSpecs.length < 30) {
      setStatus("error");
      setMessage("Project specifications must be at least 30 characters.");
      return;
    }

    if (!endpoint || endpoint.includes("your-form-id")) {
      setStatus("success");
      setMessage("Scoping intake received! (Configured with local demo fallback).");
      form.reset();
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Submit failed");

      setStatus("success");
      setMessage(
        "Scoping request received. Our engineering team will respond within two business days."
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Submission error. Please contact engineering@krsis.com directly.");
    }
  }

  return (
    <form id="scoping-form" onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-body">
          Full Name
          <input
            type="text"
            name="full_name"
            autoComplete="name"
            required
            minLength={2}
            placeholder="Dr. Aris Thorne"
            className={inputClass}
          />
        </label>
        <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-body">
          Work Email
          <input
            type="email"
            name="work_email"
            autoComplete="email"
            required
            placeholder="a.thorne@biomed-systems.com"
            className={inputClass}
          />
        </label>
      </div>

      <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-body">
        Company / Organization
        <input
          type="text"
          name="company_name"
          required
          placeholder="Acro BioTech Corp"
          className={inputClass}
        />
      </label>

      <fieldset className="grid gap-2.5 border-none p-0">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-body">
          Engagement Mode
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {engagementTypes.map((type) => (
            <label
              key={type.value}
              className="hover:border-accent/60 has-[:checked]:bg-accent/5 flex cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-xs font-medium text-heading transition-all duration-150 has-[:checked]:border-accent"
            >
              <input
                type="radio"
                name="engagement_type"
                value={type.value}
                required
                className="accent-accent"
              />
              {type.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-2.5 border-none p-0">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-body">
          Technical Domains (Select All Applicable)
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {technicalDomains.map((domain) => (
            <label
              key={domain.value}
              className="hover:border-accent/60 has-[:checked]:bg-accent/5 flex cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-xs font-medium text-heading transition-all duration-150 has-[:checked]:border-accent"
            >
              <input
                type="checkbox"
                name="technical_domains"
                value={domain.value}
                className="accent-accent"
              />
              {domain.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-body">
        Project Specifications & Requirements
        <textarea
          name="project_specs"
          rows={4}
          required
          minLength={30}
          placeholder="Describe target architecture, protocols, compliance needs (e.g. IEC 62304, SOC 2), timeline..."
          className={`${inputClass} resize-y font-mono text-xs`}
        />
      </label>

      <label className="flex cursor-pointer items-center gap-2.5 text-xs text-heading">
        <input
          type="checkbox"
          name="nda_requested"
          value="yes"
          className="h-4 w-4 rounded border-line accent-accent"
        />
        Require mutual NDA execution prior to technical disclosure
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === "loading" ? "Processing Scoping Intake…" : "Submit Scoping Request"}
      </button>

      {message && (
        <div
          role="status"
          className={`rounded-xl border p-3.5 text-center text-xs font-medium ${
            status === "error"
              ? "border-red-500/30 bg-red-500/10 text-red-500 dark:text-red-400"
              : "border-accent/30 bg-accent/10 text-accent"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
