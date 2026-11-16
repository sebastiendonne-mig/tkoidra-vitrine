import { test } from "node:test";
import assert from "node:assert/strict";
import { applyOptOut, OPT_OUT_KEY } from "./analytics-opt-out.ts";

function fakeStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
    has: (k: string) => data.has(k),
  };
}

const ev = (url: string) => ({ type: "pageview" as const, url });

test("?me=1 dans event.url : pose le drapeau et supprime l'événement", () => {
  const s = fakeStorage();
  assert.equal(applyOptOut(ev("https://www.tkoidra.com/fr?me=1"), s), null);
  assert.equal(s.has(OPT_OUT_KEY), true);
});

test("?me=0 dans event.url : retire le drapeau et laisse passer l'événement", () => {
  const s = fakeStorage({ [OPT_OUT_KEY]: "1" });
  const e = ev("https://www.tkoidra.com/fr?me=0");
  assert.equal(applyOptOut(e, s), e);
  assert.equal(s.has(OPT_OUT_KEY), false);
});

test("drapeau présent, sans paramètre : événement supprimé", () => {
  const s = fakeStorage({ [OPT_OUT_KEY]: "1" });
  assert.equal(applyOptOut(ev("https://www.tkoidra.com/fr"), s), null);
});

test("drapeau absent, sans paramètre : événement transmis", () => {
  const e = ev("https://www.tkoidra.com/fr");
  assert.equal(applyOptOut(e, fakeStorage()), e);
});

test("storage null : événement transmis", () => {
  const e = ev("https://www.tkoidra.com/fr?me=1");
  assert.equal(applyOptOut(e, null), e);
});

test("setItem qui lève : événement transmis", () => {
  const s = {
    getItem: () => null,
    setItem: () => {
      throw new Error("quota");
    },
    removeItem: () => {},
  };
  const e = ev("https://www.tkoidra.com/fr?me=1");
  assert.equal(applyOptOut(e, s), e);
});

test("?me=1 uniquement dans locationSearch : pose le drapeau, supprime l'événement", () => {
  const s = fakeStorage();
  assert.equal(applyOptOut(ev("https://www.tkoidra.com/fr"), s, "?me=1"), null);
  assert.equal(s.has(OPT_OUT_KEY), true);
});

test("?me=0 uniquement dans locationSearch : retire le drapeau, transmet l'événement", () => {
  const s = fakeStorage({ [OPT_OUT_KEY]: "1" });
  const e = ev("https://www.tkoidra.com/fr");
  assert.equal(applyOptOut(e, s, "?me=0"), e);
  assert.equal(s.has(OPT_OUT_KEY), false);
});

test("locationSearch sans me= et drapeau présent : événement supprimé", () => {
  const s = fakeStorage({ [OPT_OUT_KEY]: "1" });
  assert.equal(applyOptOut(ev("https://www.tkoidra.com/fr"), s, "?utm=x"), null);
});

test("event.url illisible : se rabat sur locationSearch", () => {
  const s = fakeStorage();
  assert.equal(applyOptOut(ev("http://[bad"), s, "?me=1"), null);
  assert.equal(s.has(OPT_OUT_KEY), true);
});

test("l'URL de l'événement prime sur locationSearch si les deux diffèrent", () => {
  const s = fakeStorage({ [OPT_OUT_KEY]: "1" });
  const e = ev("https://www.tkoidra.com/fr?me=0");
  assert.equal(applyOptOut(e, s, "?me=1"), e);
  assert.equal(s.has(OPT_OUT_KEY), false);
});
