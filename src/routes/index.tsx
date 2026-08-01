import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapBackdrop } from "@/components/ride/map-backdrop";
import { DriverChatScreen } from "@/components/ride/driver-chat-screen";
import {
  SelectRideSheet,
  SearchingSheet,
  DriverAcceptedSheet,
  CancelReasonsSheet,
  CancelConfirmSheet,
  InProgressSheet,
  CompletedSheet,
} from "@/components/ride/sheets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ride Flow — Premium Passenger Ride Booking UI" },
      {
        name: "description",
        content:
          "A polished ride-hailing passenger flow: choose a ride type, match with a driver, track the trip and rate it — all in elegant bottom sheets.",
      },
      { property: "og:title", content: "Ride Flow — Premium Passenger Ride Booking UI" },
      {
        property: "og:description",
        content:
          "Choose a ride type, match with a driver, track your trip and rate it — an elegant light-theme bottom sheet ride flow.",
      },
    ],
  }),
  component: RideFlow,
});

type Step =
  | "select"
  | "searching"
  | "accepted"
  | "chat"
  | "reasons"
  | "confirm"
  | "progress"
  | "completed";

function RideFlow() {
  const [step, setStep] = useState<Step>("select");

  return (
    <main className="flex min-h-screen justify-center bg-foreground/5">
      <div className="relative h-screen w-full max-w-[520px] overflow-hidden bg-surface">
        <h1 className="sr-only">Ride flow</h1>
        <MapBackdrop carVisible={step === "accepted" || step === "progress"} />

        {step === "select" && <SelectRideSheet onFindDriver={() => setStep("searching")} />}
        {step === "searching" && <SearchingSheet onCancel={() => setStep("accepted")} />}
        {step === "accepted" && (
          <DriverAcceptedSheet
            onCancel={() => setStep("reasons")}
            onStart={() => setStep("progress")}
            onMessage={() => setStep("chat")}
          />
        )}
        {step === "chat" && <DriverChatScreen onBack={() => setStep("accepted")} />}
        {step === "reasons" && (
          <CancelReasonsSheet
            onBack={() => setStep("accepted")}
            onConfirm={() => setStep("confirm")}
          />
        )}
        {step === "confirm" && (
          <CancelConfirmSheet
            onSearchAgain={() => setStep("searching")}
            onCancelRide={() => setStep("select")}
          />
        )}
        {step === "progress" && <InProgressSheet onComplete={() => setStep("completed")} />}
        {step === "completed" && <CompletedSheet onDone={() => setStep("select")} />}
      </div>
    </main>
  );
}
