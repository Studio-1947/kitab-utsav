"use client";

import { useActionState, useState } from "react";
import { register, type RegisterState } from "@/app/actions";
import { EVENT, SCHEDULE } from "@/data/event";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { FormField } from "@/components/ui/FormField";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHead";
import { Toast } from "@/components/ui/Toast";
import { cn, dayParts } from "@/lib/utils";

const PERKS = ["Session and speaker announcements", "A reminder before the days you pick", "News of book launches at the festival"];

export function Register() {
  const [state, action, pending] = useActionState<RegisterState, FormData>(register, { status: "idle" });
  const [days, setDays] = useState<string[]>([SCHEDULE[0].date]);
  const v = state.values;
  const done = state.status === "ok";

  const toggle = (date: string) =>
    setDays((cur) => (cur.includes(date) ? cur.filter((d) => d !== date) : [...cur, date]));

  return (
    <section id="book" aria-labelledby="book-title" className="scroll-mt-20 py-12 md:py-18">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-3">
          <Eyebrow>Book my seat</Eyebrow>
          <h2 id="book-title" className="mt-1.5 text-section-title text-ink-content">Save Your Seat at Kitab Utsav {EVENT.city}</h2>
          <p className="text-body text-ink-muted">
            Tell us which days you plan to come, {EVENT.dateShort}, and we will keep you posted as sessions and speakers are announced.
          </p>
          <ul className="mt-1.5 flex flex-col gap-2 text-ink-content">
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <Icon name="check" className="text-good" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {done ? (
          <div className="flex flex-col items-start gap-3 rounded-panel border border-border-content bg-surface-content p-6 shadow-card" role="status">
            <span className="grid size-12 place-items-center rounded-full bg-good text-on-good">
              <Icon name="ticketCheck" className="size-6" />
            </span>
            <h3 className="text-[1.25rem] text-ink-content">Your seat is noted, {state.name}</h3>
            <p className="text-body text-ink-muted">We will send session and speaker updates before your days. See you at Kitab Utsav {EVENT.city}.</p>
            <Toast icon="ticketCheck">Seat booked for Kitab Utsav</Toast>
          </div>
        ) : (
          <form action={action} noValidate className="flex flex-col gap-4.5 rounded-panel border border-border-content bg-surface-content p-4.5 shadow-card md:p-6">
            <FormField id="r-name" name="name" label="Full name" autoComplete="name" required defaultValue={v?.name} error={state.errors?.name} />
            <div className="grid gap-3.5 md:grid-cols-2">
              <FormField
                id="r-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                label="Mobile number"
                required
                defaultValue={v?.phone}
                error={state.errors?.phone}
              />
              <FormField
                id="r-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                label="Email address"
                optional
                defaultValue={v?.email}
                error={state.errors?.email}
              />
            </div>

            <fieldset className="flex min-w-0 flex-col gap-2">
              <legend className="mb-2 text-label text-ink-content">Days you plan to come</legend>
              <div className="flex flex-wrap gap-2">
                {SCHEDULE.map((d, i) => {
                  const { weekday, day } = dayParts(d.date);
                  return (
                    <Chip key={d.date} pressed={days.includes(d.date)} onClick={() => toggle(d.date)}>
                      Day {i + 1} · {weekday} {day}
                    </Chip>
                  );
                })}
              </div>
              {days.map((d) => (
                <input key={d} type="hidden" name="days" value={d} />
              ))}
              {state.errors?.days && <span className="text-[0.76rem] text-bad">{state.errors.days}</span>}
            </fieldset>

            <div className="flex items-start gap-2.5">
              <input type="checkbox" id="r-ok" name="consent" defaultChecked={v?.consent ?? true} className="mt-0.5 size-[18px] flex-none accent-accent" />
              <label htmlFor="r-ok" className="text-[0.85rem] leading-[1.55] text-ink-muted">
                Send me updates about Kitab Utsav and new books from Rajkamal Prakashan Samuh.
              </label>
            </div>

            <Button type="submit" size="lg" disabled={pending} className={cn("self-stretch md:self-start")}>
              {pending ? "Booking…" : "Book my seat"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
