import { useState, type FormEvent } from "react";

const endpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");

    if (!email.includes("@")) {
      setStatus("error");
      setMessage("Enter a valid email so we can follow up.");
      return;
    }

    if (!endpoint || endpoint.includes("your-form-id")) {
      setStatus("success");
      setMessage("Thanks! Add your Formspree endpoint in .env to enable delivery.");
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
      setMessage("Thanks — we'll get back to you within two business days.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please email us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid w-full gap-3.5">
      <label className="grid gap-1.5 text-sm text-body">
        Name
        <input
          type="text"
          name="name"
          autoComplete="name"
          required
          className="rounded-[10px] border border-line bg-surface px-3.5 py-3 font-body text-heading outline-none transition-colors focus:border-accent"
        />
      </label>
      <label className="grid gap-1.5 text-sm text-body">
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          className="rounded-[10px] border border-line bg-surface px-3.5 py-3 font-body text-heading outline-none transition-colors focus:border-accent"
        />
      </label>
      <label className="grid gap-1.5 text-sm text-body">
        Message
        <textarea
          name="message"
          rows={4}
          required
          className="resize-y rounded-[10px] border border-line bg-surface px-3.5 py-3 font-body text-heading outline-none transition-colors focus:border-accent"
        />
      </label>
      <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      <p
        role="status"
        className={`min-h-[1.4em] text-sm ${status === "error" ? "text-red-400" : "text-accent"}`}
      >
        {message}
      </p>
    </form>
  );
}
