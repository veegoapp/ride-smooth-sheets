import { useState } from "react";
import {
  Car,
  Wallet,
  Banknote,
  CreditCard,
  Check,
  Star,
  Phone,
  MessageSquareText,
  ShieldAlert,
  LifeBuoy,
  Clock,
  X,
  RotateCcw,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { GhostButton, PrimaryButton, SheetShell, SheetTitle } from "./sheet-shell";

/* ---------------- shared bits ---------------- */

function TripRow() {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-2xl bg-surface p-3.5 ring-1 ring-border">
      <div className="flex flex-col items-center gap-1 pt-0.5">
        <span className="h-2 w-2 rounded-full bg-muted-foreground" />
        <span className="h-5 w-px bg-border" />
        <span className="h-2 w-2 rounded-sm bg-primary" />
      </div>
      <div className="min-w-0 flex-1 space-y-2.5">
        <p className="truncate text-[0.8125rem] font-medium text-muted-foreground">
          Al Rawdah St. 42
        </p>
        <p className="truncate text-[0.8125rem] font-semibold text-foreground">
          Gateway Mall, North Tower
        </p>
      </div>
      <div className="text-right">
        <p className="tabular text-[0.8125rem] font-semibold text-foreground">18 min</p>
        <p className="tabular text-[0.75rem] text-muted-foreground">7.4 km</p>
      </div>
    </div>
  );
}

export function Stars({
  value,
  size = 14,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i <= Math.round(value) ? "text-gold" : "text-border"}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

/* ---------------- 1. Select ride type ---------------- */

const RIDE_TYPES = [
  { id: "economy", name: "Economy", desc: "Affordable everyday rides", seats: 4, price: 42.5, eta: "3 min" },
  { id: "economy-plus", name: "Economy Plus", desc: "Newer cars, more legroom", seats: 4, price: 56.0, eta: "5 min" },
  { id: "comfort", name: "Comfort", desc: "Premium sedans, top drivers", seats: 4, price: 78.25, eta: "6 min" },
];

export function SelectRideSheet({ onFindDriver }: { onFindDriver: () => void }) {
  const [selected, setSelected] = useState("economy");
  const [payment, setPayment] = useState<"cash" | "visa">("cash");
  const [useWallet, setUseWallet] = useState(true);
  const balance = 120.0;

  return (
    <SheetShell sheetKey="select">
      <SheetTitle title="Choose your ride" subtitle="Prices include taxes and fees" />
      <TripRow />

      <div className="space-y-2">
        {RIDE_TYPES.map((r) => {
          const active = r.id === selected;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelected(r.id)}
              className={cn(
                "press flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-left",
                active
                  ? "border-primary bg-primary/4 shadow-card"
                  : "border-border bg-card hover:bg-accent/60",
              )}
            >
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                  active ? "bg-primary text-primary-foreground" : "bg-surface text-foreground",
                )}
              >
                <Car className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-[0.9375rem] font-semibold tracking-[-0.01em] text-foreground">
                    {r.name}
                  </p>
                  <span className="rounded-md bg-surface px-1.5 py-0.5 text-[0.6875rem] font-medium text-muted-foreground">
                    {r.seats} seats
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[0.8125rem] text-muted-foreground">{r.desc}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="tabular text-[0.9375rem] font-bold text-foreground">
                  {r.price.toFixed(2)}
                  <span className="ml-1 text-[0.6875rem] font-semibold text-muted-foreground">
                    SAR
                  </span>
                </p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-[0.75rem] text-muted-foreground">
                  <Clock className="h-3 w-3" strokeWidth={2} />
                  {r.eta}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-2.5">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Payment
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { id: "cash", label: "Cash", sub: "Pay driver", icon: Banknote },
              { id: "visa", label: "Visa", sub: "•••• 4821", icon: CreditCard },
            ] as const
          ).map((p) => {
            const active = payment === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPayment(p.id)}
                className={cn(
                  "press flex items-center gap-2.5 rounded-2xl border p-3",
                  active ? "border-primary bg-primary/4" : "border-border bg-card hover:bg-accent/60",
                )}
              >
                <p.icon
                  className={cn("h-4.5 w-4.5", active ? "text-primary" : "text-muted-foreground")}
                  strokeWidth={1.8}
                />
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-[0.875rem] font-semibold text-foreground">
                    {p.label}
                  </span>
                  <span className="block truncate text-[0.75rem] text-muted-foreground">
                    {p.sub}
                  </span>
                </span>
                {active ? <Check className="h-4 w-4 text-primary" strokeWidth={2.4} /> : null}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card ring-1 ring-border">
            <Wallet className="h-4.5 w-4.5 text-primary" strokeWidth={1.8} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[0.875rem] font-semibold text-foreground">Wallet balance</p>
            <p className="tabular text-[0.8125rem] text-muted-foreground">
              {balance.toFixed(2)} SAR available
            </p>
          </div>
          <Switch checked={useWallet} onCheckedChange={setUseWallet} aria-label="Use wallet" />
        </div>
      </div>

      <div className="mt-5">
        <PrimaryButton onClick={onFindDriver}>
          Find Driver
          <span className="tabular opacity-70">
            · {RIDE_TYPES.find((r) => r.id === selected)!.price.toFixed(2)} SAR
          </span>
        </PrimaryButton>
      </div>
    </SheetShell>
  );
}

/* ---------------- 2. Searching ---------------- */

export function SearchingSheet({ onCancel }: { onCancel: () => void }) {
  return (
    <SheetShell sheetKey="searching">
      <div className="flex flex-col items-center pb-1 pt-2">
        <div className="relative flex h-28 w-28 items-center justify-center">
          {[0, 0.8, 1.6].map((d) => (
            <span
              key={d}
              className="absolute h-24 w-24 animate-radar rounded-full bg-primary/18"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
          <span className="absolute h-24 w-24 rounded-full border border-border" />
          <span
            className="absolute h-24 w-24 animate-sweep rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, oklch(0.26 0.055 262 / 0) 0deg, oklch(0.26 0.055 262 / 0) 270deg, oklch(0.26 0.055 262 / 0.35) 360deg)",
              WebkitMaskImage:
                "radial-gradient(closest-side, transparent 76%, black 78%, black 100%)",
              maskImage: "radial-gradient(closest-side, transparent 76%, black 78%, black 100%)",
            }}
          />

          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-float">
            <Car className="h-5.5 w-5.5 text-primary-foreground" strokeWidth={1.8} />
          </span>
        </div>

        <h2 className="mt-5 text-[1.25rem] font-bold tracking-[-0.02em] text-foreground">
          Finding a nearby driver
        </h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Matching you with the closest Economy car
        </p>

        <div className="mt-4 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-shimmer rounded-full bg-primary"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl bg-surface px-4 py-3 ring-1 ring-border">
        <span className="text-[0.8125rem] text-muted-foreground">Average wait time</span>
        <span className="tabular text-[0.8125rem] font-semibold text-foreground">~ 2 min</span>
      </div>

      <div className="mt-3">
        <GhostButton onClick={onCancel}>Cancel search</GhostButton>
      </div>
    </SheetShell>
  );
}

/* ---------------- 3. Driver accepted ---------------- */

export function DriverAcceptedSheet({
  onCancel,
  onStart,
  onMessage,
}: {
  onCancel: () => void;
  onStart: () => void;
  onMessage: () => void;
}) {
  return (
    <SheetShell sheetKey="accepted">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Driver on the way
          </p>
          <h2 className="mt-1 text-[1.25rem] font-bold tracking-[-0.02em] text-foreground">
            Arrives in 4 min
          </h2>
        </div>
        <span className="rounded-full bg-success/10 px-3 py-1.5 text-[0.75rem] font-semibold text-success">
          Confirmed
        </span>
      </div>

      <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-card p-3.5 shadow-card">
        <div className="flex h-13 w-13 items-center justify-center rounded-full bg-surface text-[1rem] font-bold text-foreground ring-1 ring-border">
          KA
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-[1rem] font-semibold tracking-[-0.01em] text-foreground">
              Karim Adel
            </p>
            <BadgeCheck className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Stars value={4.9} />
            <span className="tabular text-[0.8125rem] font-medium text-foreground">4.9</span>
            <span className="text-[0.75rem] text-muted-foreground">· 1,284 trips</span>
          </div>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-3.5 rounded-2xl bg-surface p-3.5 ring-1 ring-border">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-card ring-1 ring-border">
          <Car className="h-5 w-5 text-foreground" strokeWidth={1.7} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.9375rem] font-semibold text-foreground">
            Toyota Camry · White
          </p>
          <p className="text-[0.8125rem] text-muted-foreground">Economy · 2023</p>
        </div>
        <span className="tabular rounded-lg border border-border bg-card px-2.5 py-1.5 text-[0.875rem] font-bold tracking-[0.06em] text-foreground">
          RDX 4821
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <GhostButton>
          <Phone className="h-4.5 w-4.5" strokeWidth={1.9} />
          Call
        </GhostButton>
        <GhostButton onClick={onMessage}>
          <MessageSquareText className="h-4.5 w-4.5" strokeWidth={1.9} />
          Message
        </GhostButton>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-2">
        <PrimaryButton onClick={onStart}>
          Start trip
          <ChevronRight className="h-4.5 w-4.5" strokeWidth={2.2} />
        </PrimaryButton>
        <button
          type="button"
          onClick={onCancel}
          className="press h-11 w-full rounded-2xl text-[0.875rem] font-semibold text-destructive hover:bg-destructive/6"
        >
          Cancel Ride
        </button>
      </div>
    </SheetShell>
  );
}

/* ---------------- 4. Cancel reasons ---------------- */

const REASONS = [
  "Driver is taking too long",
  "I entered the wrong pickup location",
  "I no longer need the ride",
  "Driver asked me to cancel",
  "I found another way to travel",
];

export function CancelReasonsSheet({
  onBack,
  onConfirm,
}: {
  onBack: () => void;
  onConfirm: () => void;
}) {
  const [reason, setReason] = useState<string | null>(null);

  return (
    <SheetShell sheetKey="reasons">
      <SheetTitle
        title="Why are you cancelling?"
        subtitle="Your feedback helps us improve the service"
      />
      <div className="space-y-2">
        {REASONS.map((r) => {
          const active = reason === r;
          return (
            <button
              key={r}
              type="button"
              onClick={() => setReason(r)}
              className={cn(
                "press flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left",
                active ? "border-primary bg-primary/4" : "border-border bg-card hover:bg-accent/60",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                  active ? "border-primary bg-primary" : "border-border",
                )}
              >
                {active ? (
                  <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
                ) : null}
              </span>
              <span className="text-[0.9375rem] font-medium text-foreground">{r}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <GhostButton onClick={onBack}>Back</GhostButton>
        <button
          type="button"
          disabled={!reason}
          onClick={onConfirm}
          className="press flex h-14 w-full items-center justify-center rounded-2xl bg-destructive text-[0.95rem] font-semibold text-destructive-foreground shadow-float hover:bg-destructive/92 disabled:cursor-not-allowed disabled:opacity-35"
        >
          Cancel Ride
        </button>
      </div>
    </SheetShell>
  );
}

/* ---------------- 5. Cancellation confirmation ---------------- */

export function CancelConfirmSheet({
  onSearchAgain,
  onCancelRide,
}: {
  onSearchAgain: () => void;
  onCancelRide: () => void;
}) {
  return (
    <SheetShell sheetKey="confirm">
      <div className="flex flex-col items-center pb-1 pt-1 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/8 ring-1 ring-destructive/15">
          <X className="h-6 w-6 text-destructive" strokeWidth={2.2} />
        </div>
        <h2 className="mt-4 text-[1.25rem] font-bold tracking-[-0.02em] text-foreground">
          Ride cancelled
        </h2>
        <p className="mt-1 max-w-[300px] text-sm text-muted-foreground">
          You can look for another driver nearby or end here.
        </p>
      </div>

      <div className="mt-5 space-y-2">
        <PrimaryButton onClick={onSearchAgain}>
          <RotateCcw className="h-4.5 w-4.5" strokeWidth={2} />
          Search for Another Driver
        </PrimaryButton>
        <GhostButton tone="danger" onClick={onCancelRide}>
          Cancel Ride
        </GhostButton>
      </div>
    </SheetShell>
  );
}

/* ---------------- 6. Ride in progress ---------------- */

export function InProgressSheet({ onComplete }: { onComplete: () => void }) {
  return (
    <SheetShell sheetKey="progress">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-shimmer rounded-full bg-success" />
            On trip
          </p>
          <h2 className="mt-1 text-[1.25rem] font-bold tracking-[-0.02em] text-foreground">
            Heading to Gateway Mall
          </h2>
        </div>
        <div className="rounded-2xl bg-surface px-3 py-2 text-right ring-1 ring-border">
          <p className="tabular text-[0.9375rem] font-bold text-foreground">12 min</p>
          <p className="text-[0.6875rem] text-muted-foreground">arrival 8:42 PM</p>
        </div>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <div className="h-full w-[62%] rounded-full bg-primary" />
      </div>

      <div className="mt-4 flex items-center gap-3.5 rounded-2xl border border-border bg-card p-3.5 shadow-card">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface ring-1 ring-border">
          <Car className="h-5 w-5 text-foreground" strokeWidth={1.7} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.9375rem] font-semibold text-foreground">Karim Adel</p>
          <p className="truncate text-[0.8125rem] text-muted-foreground">
            Toyota Camry · RDX 4821
          </p>
        </div>
        <Stars value={4.9} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <GhostButton tone="danger">
          <ShieldAlert className="h-4.5 w-4.5" strokeWidth={1.9} />
          SOS
        </GhostButton>
        <GhostButton>
          <LifeBuoy className="h-4.5 w-4.5" strokeWidth={1.9} />
          Need Help
        </GhostButton>
      </div>

      <div className="mt-2">
        <PrimaryButton onClick={onComplete}>End trip</PrimaryButton>
      </div>
    </SheetShell>
  );
}

/* ---------------- 7. Trip completed ---------------- */

export function CompletedSheet({ onDone }: { onDone: () => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <SheetShell sheetKey="completed">
      <div className="flex flex-col items-center text-center">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Trip completed
        </p>
        <p className="tabular mt-1.5 text-[2.25rem] font-bold leading-none tracking-[-0.03em] text-foreground">
          42.50 <span className="text-[1rem] font-semibold text-muted-foreground">SAR</span>
        </p>
        <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[0.8125rem] font-medium text-foreground ring-1 ring-border">
          <Banknote className="h-4 w-4 text-muted-foreground" strokeWidth={1.9} />
          Paid with Cash
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
        <p className="text-center text-[0.9375rem] font-semibold text-foreground">
          How was your ride with Karim?
        </p>
        <div className="mt-3 flex justify-center gap-2.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i} star`}
              onClick={() => setRating(i)}
              className="press"
            >
              <Star
                className={cn("h-8 w-8", i <= rating ? "text-gold" : "text-border")}
                fill="currentColor"
                strokeWidth={0}
              />
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2}
          placeholder="Add a comment (optional)"
          className="mt-3 w-full resize-none rounded-xl border border-border bg-card px-3.5 py-3 text-[0.875rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      <div className="mt-4">
        <PrimaryButton onClick={onDone}>OK</PrimaryButton>
      </div>
    </SheetShell>
  );
}
