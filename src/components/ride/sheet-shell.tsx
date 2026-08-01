import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SheetShell({
  children,
  className,
  sheetKey,
}: {
  children: ReactNode;
  className?: string;
  sheetKey: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
      <div
        key={sheetKey}
        className={cn(
          "pointer-events-auto w-full max-w-[520px] animate-sheet-up sheet-surface px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3",
          className,
        )}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
        {children}
      </div>
    </div>
  );
}

export function SheetTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-[1.375rem] font-bold leading-tight tracking-[-0.02em] text-foreground">
        {title}
      </h2>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "press flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[0.975rem] font-semibold tracking-[-0.01em] text-primary-foreground shadow-float hover:bg-primary/92 disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  tone?: "neutral" | "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "press flex h-14 w-full items-center justify-center gap-2 rounded-2xl border text-[0.95rem] font-semibold",
        tone === "danger"
          ? "border-destructive/25 bg-destructive/6 text-destructive hover:bg-destructive/10"
          : "border-border bg-surface text-foreground hover:bg-accent",
        className,
      )}
    >
      {children}
    </button>
  );
}
