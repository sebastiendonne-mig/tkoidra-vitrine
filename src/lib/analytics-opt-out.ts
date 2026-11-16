import type { BeforeSendEvent } from "@vercel/analytics/next";

export const OPT_OUT_KEY = "va-disable";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

// Lit le paramètre ?me= dans l'URL de l'événement, sinon dans la query string
// de la page (locationSearch). Un des deux suffit ; l'URL de l'événement prime.
function readMe(eventUrl: string, locationSearch: string): string | null {
  let fromUrl: string | null = null;
  try {
    fromUrl = new URL(eventUrl, "https://x.invalid").searchParams.get("me");
  } catch {
    // URL illisible : on se rabat sur locationSearch
  }
  if (fromUrl !== null) return fromUrl;
  return new URLSearchParams(locationSearch).get("me");
}

// Fonction pure (storage injecté) : ?me=1 pose le drapeau, ?me=0 le retire,
// drapeau présent → null (événement supprimé). Sans storage, ou en cas
// d'erreur de stockage, l'événement passe : on n'interrompt pas la mesure.
export function applyOptOut(
  event: BeforeSendEvent,
  storage: StorageLike | null,
  locationSearch = "",
): BeforeSendEvent | null {
  if (!storage) return event;
  try {
    const me = readMe(event.url, locationSearch);
    if (me === "1") storage.setItem(OPT_OUT_KEY, "1");
    else if (me === "0") storage.removeItem(OPT_OUT_KEY);
    return storage.getItem(OPT_OUT_KEY) ? null : event;
  } catch {
    return event;
  }
}
