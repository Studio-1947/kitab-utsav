import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Form field (.fm-field): label above, 12px-radius input, error in bad colour. */
export function FormField({
  id,
  label,
  optional,
  error,
  className,
  ...input
}: {
  id: string;
  label: ReactNode;
  optional?: boolean;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const errId = `${id}-err`;
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-label text-ink-content">
        {label} {optional && <i className="font-medium not-italic opacity-60">(optional)</i>}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={cn(
          "w-full rounded-input border border-border-content bg-page px-[13px] py-[11px] text-[16px] text-ink-content transition-[border-color,box-shadow] duration-150",
          "placeholder:text-ink-muted placeholder:opacity-70 focus:border-accent focus:shadow-focus focus:outline-none",
          error && "border-bad",
        )}
        {...input}
      />
      {error && (
        <span id={errId} className="text-[0.76rem] text-bad">
          {error}
        </span>
      )}
    </div>
  );
}
