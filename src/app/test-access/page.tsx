import type { Metadata } from "next";
import { TestAccessClient } from "./test-access-client";

export const metadata: Metadata = {
  title: "Test",
  // Qidiruv tizimlariga ko'rinmasin
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function TestAccessPage() {
  return <TestAccessClient />;
}
