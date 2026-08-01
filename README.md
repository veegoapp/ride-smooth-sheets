# Ride Flow Sheets

Design the complete Ride Flow Bottom Sheet UI for my passenger app (Uber-style). I only want the UI design. Do not change the flow, do not add new features, and do not remove any step.

The app uses Light Theme. All bottom sheets should have a clean white background with premium styling. Primary buttons should use a dark navy blue color. The overall design must feel modern, premium, elegant, and production-ready.

Important Design Requirements

Every step should appear as a bottom sheet/card sliding from the bottom, not as a full-screen page.

Use a modern, premium UI similar to leading ride-hailing apps.

Do not use cartoon-style illustrations or cartoon icons.

Use only clean, minimal, professional icons.

Focus on spacing, typography, hierarchy, shadows, rounded corners, and polished micro-interactions.

Bottom Sheet 1 – Select Ride Type

After the passenger selects the destination, show a bottom sheet containing:

Ride types:

Economy

Economy Plus

Comfort

Display the trip price beside each ride type.

Payment method section (Cash or Visa).

Wallet balance section.

A Wallet toggle switch (On/Off) to allow using wallet balance if available.

A large primary Find Driver button.

Bottom Sheet 2 – Searching for Driver

When the passenger taps Find Driver:

Show a professional searching animation.

The UI should feel premium and unique.

Display that the app is searching for a nearby driver.

Bottom Sheet 3 – Driver Accepted

When a driver accepts:

Driver name.

Driver rating.

Small vehicle icon with vehicle information.

Call driver button.

Message driver button.

Cancel Ride button.

Bottom Sheet 4 – Cancel Ride Reasons

When the passenger taps Cancel Ride: Show a bottom sheet containing:

Five cancellation reasons.

The passenger selects one reason.

Two buttons:

Cancel Ride

Back

Bottom Sheet 5 – Cancellation Confirmation

If the passenger confirms cancellation: Show a bottom sheet with:

Search for Another Driver

Cancel Ride

Bottom Sheet 6 – Ride in Progress

If the ride continues: Show a bottom sheet indicating the passenger is currently on the trip. Include:

SOS button.

Need Help button.

Bottom Sheet 7 – Trip Completed

After the driver ends the trip: Show a bottom sheet containing:

Total amount to pay.

Payment method.

Star rating for the driver.

Comment field (optional).

OK button.

Use a consistent design language across all bottom sheets. Every card should feel polished, premium, and visually cohesive with the rest of the application. The design must look modern, high-end, and suitable for a real ride-hailing application.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/00af87df-5655-4c7b-9900-41ff1ef9af5e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
