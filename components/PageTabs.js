"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Fil d'actu / Calendrier switch. A real Link to a real route (App Router
// server-renders each page independently), styled active/inactive with
// usePathname — this is the one bit of the header that has to be a client
// component, everything else around it stays server-rendered.
export default function PageTabs() {
  const pathname = usePathname();
  const isCalendrier = pathname.startsWith("/calendrier");

  return (
    <nav className="page-tabs">
      <Link href="/" className="page-tab" aria-pressed={!isCalendrier}>
        Fil d&apos;actu
      </Link>
      <Link href="/calendrier" className="page-tab" aria-pressed={isCalendrier}>
        Calendrier
      </Link>
    </nav>
  );
}
