import { MapPin, Navigation, Plus, Minus, ChevronLeft } from "lucide-react";

export function MapBackdrop({ carVisible = false }: { carVisible?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-surface">
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="700" fill="oklch(0.965 0.006 250)" />
        <g fill="oklch(0.945 0.012 200)">
          <rect x="-40" y="80" width="180" height="120" rx="10" />
          <rect x="250" y="420" width="220" height="150" rx="12" />
        </g>
        <g fill="oklch(0.955 0.02 150)" opacity="0.9">
          <rect x="30" y="470" width="130" height="110" rx="14" />
          <rect x="270" y="120" width="150" height="90" rx="14" />
        </g>
        <g stroke="oklch(1 0 0)" strokeLinecap="round" fill="none">
          <path d="M-20 240 H420" strokeWidth="26" />
          <path d="M-20 520 H420" strokeWidth="18" />
          <path d="M120 -20 V720" strokeWidth="22" />
          <path d="M310 -20 V720" strokeWidth="16" />
          <path d="M-20 380 H200 L200 720" strokeWidth="12" />
        </g>
        <g
          stroke="oklch(0.9 0.01 255)"
          strokeWidth="1"
          strokeDasharray="6 10"
          opacity="0.8"
          fill="none"
        >
          <path d="M-20 240 H420" />
          <path d="M120 -20 V720" />
        </g>
        <path
          d="M120 560 C120 470 200 460 200 380 C200 300 260 260 310 240"
          fill="none"
          stroke="oklch(0.26 0.055 262)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      {/* origin */}
      <div className="absolute left-[30%] top-[80%] -translate-x-1/2 -translate-y-1/2">
        <div className="h-3.5 w-3.5 rounded-full border-[3px] border-primary bg-card shadow-float" />
      </div>

      {/* destination */}
      <div className="absolute left-[77.5%] top-[34%] -translate-x-1/2 -translate-y-full animate-float-soft">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary shadow-float">
          <MapPin className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.2} />
        </div>
      </div>

      {carVisible ? (
        <div className="absolute left-[42%] top-[30%] -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-float ring-1 ring-border">
            <Navigation
              className="h-4.5 w-4.5 rotate-45 text-primary"
              fill="currentColor"
              strokeWidth={1.5}
            />
          </div>
        </div>
      ) : null}

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
        <button
          type="button"
          className="press flex h-11 w-11 items-center justify-center rounded-full bg-card text-foreground shadow-card ring-1 ring-border"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
        </button>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-border">
            <button
              type="button"
              className="press flex h-11 w-11 items-center justify-center text-foreground"
              aria-label="Zoom in"
            >
              <Plus className="h-4.5 w-4.5" strokeWidth={2.2} />
            </button>
            <div className="mx-2 h-px bg-border" />
            <button
              type="button"
              className="press flex h-11 w-11 items-center justify-center text-foreground"
              aria-label="Zoom out"
            >
              <Minus className="h-4.5 w-4.5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-foreground/8 to-transparent" />
    </div>
  );
}
