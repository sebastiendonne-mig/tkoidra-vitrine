"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { applyOptOut } from "../lib/analytics-opt-out";

// Opt-out client-side pour Web Analytics : si la clé localStorage "va-disable"
// est présente sur ce navigateur, aucun événement n'est envoyé à Vercel.
// Activer l'opt-out : ouvrir n'importe quelle page de tkoidra.com avec ?me=1
// (une fois par navigateur) ; le retirer avec ?me=0. Le drapeau persiste tant
// que le stockage du site n'est pas effacé (navigation privée, autre
// navigateur ou appareil non concernés).

// L'accès à localStorage peut lever (navigation privée, stockage bloqué).
function safeStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function AnalyticsOptOut() {
  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) =>
        applyOptOut(
          event,
          typeof window !== "undefined" ? safeStorage() : null,
          typeof window !== "undefined" ? window.location.search : "",
        )
      }
    />
  );
}
