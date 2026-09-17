"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

// Opt-out client-side pour Web Analytics : si la clé localStorage "va-disable"
// est présente sur ce navigateur, aucun événement n'est envoyé à Vercel.
// Activer l'opt-out sur un appareil : depuis la console du navigateur, sur
// n'importe quelle page de tkoidra.com, exécuter
// localStorage.setItem("va-disable", "1") — persiste tant que le stockage
// du site n'est pas effacé (navigation privée, autre navigateur ou appareil
// non concernés).
export function AnalyticsOptOut() {
  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => {
        if (typeof window !== "undefined" && window.localStorage.getItem("va-disable")) {
          return null;
        }
        return event;
      }}
    />
  );
}
