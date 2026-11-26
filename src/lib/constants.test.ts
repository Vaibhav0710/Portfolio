import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, expect, test } from "vitest";
import { parse } from "yaml";
import { blockedIn, blockedPhrases, publicFacts, unknownNumbers } from "@/test-utils/truth";
import * as content from "./constants";
import { ABOUT_STATEMENT, STATS, WHY } from "./constants";

// Used when the master profile is not on disk (CI, Vercel)
const FALLBACK_BLOCKED = [
  "40%",
  "82%",
  "99.9",
  "12k",
  "10k",
  "10,000",
  "4,000",
  "150+",
  "3x",
  "AES-256",
  "1000 concurrent",
  "1,000 concurrent",
  "Kubernetes at work",
  "Hermes",
  "Acuity",
  "EyeCare",
];

// Links and profile handles ("github.com/Vaibhav0710") carry ids whose digits are not claims
const LINK_PREFIXES = ["http", "mailto:", "tel:", "#", "/", "github.com/", "linkedin.com/"];

// Formatting fields and ordinal card labels ("01"), not claims
const FORMAT_KEYS = new Set(["decimals", "n"]);

const collectText = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (typeof value === "number") return [String(value)];
  if (Array.isArray(value)) return value.flatMap(collectText);
  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => !FORMAT_KEYS.has(key))
      .flatMap(([, child]) => collectText(child));
  }
  return [];
};

const isLink = (text: string) => LINK_PREFIXES.some((prefix) => text.startsWith(prefix));

const allText = collectText(content).filter((text) => !isLink(text)).join("\n");

const findMasterProfile = (start: string): string | null => {
  let folder = start;
  while (true) {
    const candidate = join(folder, "career", "master_profile.yaml");
    if (existsSync(candidate)) return candidate;
    const parent = dirname(folder);
    if (parent === folder) return null;
    folder = parent;
  }
};

const readYaml = (path: string) => parse(readFileSync(path, "utf8")) as Record<string, unknown>;

const masterProfilePath = findMasterProfile(process.cwd());
const profile = masterProfilePath ? readYaml(masterProfilePath) : null;

// The notice period comes from the form-answer bank beside the profile; nothing else from that file is a fact here
const noticePeriod = () => {
  const qaBankPath = join(dirname(masterProfilePath as string), "qa_bank.yaml");
  return existsSync(qaBankPath) ? publicFacts({ notice_period: readYaml(qaBankPath).notice_period }) : "";
};

const facts = profile ? [publicFacts(profile), noticePeriod()].join("\n") : "";

describe("portfolio content", () => {
  test("no never_claim phrase appears", () => {
    const blocked = [...FALLBACK_BLOCKED, ...(profile ? blockedPhrases(profile, facts) : [])];

    const found = blockedIn(allText, blocked);

    expect(found).toEqual([]);
  });

  test("the blocked-phrase check catches a planted claim", () => {
    const found = blockedIn("Cut latency by 40 % and served 1,000 concurrent votes at Acuity.", FALLBACK_BLOCKED);

    expect(found).toEqual(["40%", "1,000 concurrent", "Acuity"]);
  });

  test("stats end on 1.5, 400, 180, 59", () => {
    const targets = STATS.map((stat) => stat.value);

    expect(targets).toEqual([1.5, 400, 180, 59]);
  });

  test("the about statement has the six parts the fill classes s1-s6 expect", () => {
    expect(ABOUT_STATEMENT).toHaveLength(6);
  });

  test("there are four hiring cards for the four entrance delays", () => {
    expect(WHY).toHaveLength(4);
  });
});

describe.skipIf(profile === null)("content against the master profile", () => {
  test("every number appears in the master profile's public facts", () => {
    const missing = unknownNumbers(allText, facts);

    expect(missing).toEqual([]);
  });

  test.each(["82%", "35%", "10,000", "10k", "p95 120 ms"])("the number check rejects %s", (sample) => {
    const missing = unknownNumbers(sample, facts);

    expect(missing.length).toBeGreaterThan(0);
  });

  test("the profile's blocked phrases include its private metrics and confidential names", () => {
    const blocked = blockedPhrases(profile as Record<string, unknown>, facts);

    expect(blocked).toEqual(expect.arrayContaining(["82%", "AES-256", "10k", "Hermes", "Acuity Eye Group"]));
  });
});
