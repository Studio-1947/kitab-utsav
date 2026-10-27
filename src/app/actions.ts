"use server";

import { SCHEDULE } from "@/data/event";

export type RegisterState = {
  status: "idle" | "error" | "ok";
  errors?: Partial<Record<"name" | "phone" | "email" | "days", string>>;
  values?: { name: string; phone: string; email: string; days: string[]; consent: boolean };
  name?: string;
};

const VALID_DAYS = new Set(SCHEDULE.map((d) => d.date));

export async function register(_prev: RegisterState, form: FormData): Promise<RegisterState> {
  const values = {
    name: String(form.get("name") ?? "").trim(),
    phone: String(form.get("phone") ?? "").replace(/\D/g, ""),
    email: String(form.get("email") ?? "").trim(),
    days: form.getAll("days").map(String).filter((d) => VALID_DAYS.has(d)),
    consent: form.get("consent") === "on",
  };

  const errors: RegisterState["errors"] = {};
  if (values.name.length < 2) errors.name = "Enter your name";
  if (!/^[6-9]\d{9}$/.test(values.phone)) errors.phone = "Enter a 10-digit mobile number";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address";
  if (values.days.length === 0) errors.days = "Pick at least one day";

  if (Object.keys(errors).length) return { status: "error", errors, values };

  // TODO: save the registration (database, Google Sheet or CRM) and send the confirmation SMS/email.
  console.info("[kitab-utsav] registration", { ...values, phone: `******${values.phone.slice(-4)}` });

  return { status: "ok", name: values.name.split(" ")[0] };
}
