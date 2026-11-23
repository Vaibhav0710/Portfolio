import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, expect, test } from "vitest";
import * as content from "./constants";
import { STATS } from "./constants";

const NEVER_CLAIM = [
  "40%",
  "99.9",
  "12k",
  "4,000",
  "150+",
  "1,000 concurrent",
  "Kubernetes at work",
  "Hermes",
  "Acuity",
  "EyeCare",
];

// Links carry ids and query strings whose digits are not claims
const LINK_PREFIXES = ["http", "mailto:", "tel:", "#", "/"];

const NUMBER_PATTERN = /\d[\d,.]*\+?/g;

const collectText = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (typeof value === "number") return [String(value)];
  if (Array.isArray(value)) return value.flatMap(collectText);
  if (value && typeof value === "object") return Object.values(value).flatMap(collectText);
  return [];
};

const allText = collectText(content);

const isLink = (text: string) => LINK_PREFIXES.some((prefix) => text.startsWith(prefix));

/** Trailing "." or "," belongs to the sentence, not the number */
const numbersIn = (text: string) => (text.match(NUMBER_PATTERN) ?? []).map((token) => token.replace(/[.,]+$/, ""));

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

const masterProfilePath = findMasterProfile(process.cwd());

describe("portfolio content", () => {
  test("no never_claim phrase appears", () => {
    const joined = allText.join("\n");

    const found = NEVER_CLAIM.filter((phrase) => joined.includes(phrase));

    expect(found).toEqual([]);
  });

  test("stats end on 1.5, 400, 180, 59", () => {
    const targets = STATS.map((stat) => stat.value);

    expect(targets).toEqual([1.5, 400, 180, 59]);
  });
});

describe.skipIf(masterProfilePath === null)("content against the master profile", () => {
  test("every number appears in the master profile", () => {
    const profile = readFileSync(masterProfilePath as string, "utf8");
    const numbers = new Set(allText.filter((text) => !isLink(text)).flatMap(numbersIn));

    const missing = [...numbers].filter((number) => !profile.includes(number));

    expect(missing).toEqual([]);
  });
});
