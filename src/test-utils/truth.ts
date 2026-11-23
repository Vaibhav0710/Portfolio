/**
 * Truth checks for portfolio text against career/master_profile.yaml.
 * Test-only: nothing in the app imports this file.
 */

// Parts of the profile that are not public facts: blocked claims, plans, interview-only stories,
// working notes, evidence paths, ids and positioning advice
const NON_FACT_KEYS = new Set([
  "never_claim",
  "planned_not_done",
  "stories",
  "note",
  "evidence",
  "evidence_base",
  "meta",
  "positioning",
  "id",
  "used_in",
  "based_on",
  "link",
  "links",
  "live",
  "credential_id",
]);

/** A number with its unit, e.g. "80%", "400+", "10k", "3x", "163 ms", "60 s" */
const NUMBER_PATTERN = /\d[\d,.]*(?:\s?(?:%|ms\b|s\b)|\+|k|x)?/g;

/** A claim number in a never_claim line, with a word prefix such as "AES-" */
const CLAIM_NUMBER_PATTERN = /(?:[A-Za-z]+-)?\d[\d,.]*(?:\s?%|\+|k|x)?/g;

// 'single-quoted' phrases; an apostrophe inside a word ("system's") is not a quote
const QUOTED_PATTERN = /(?<!\w)'([^']+)'(?!\w)/g;
const EXAMPLES_PATTERN = /e\.g\. ([^)]+)\)/g;

type Profile = Record<string, unknown>;

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Same form for both sides: plain hyphens and no space before "%" */
export const normalise = (text: string) => text.replace(/[–—]/g, "-").replace(/\s+%/g, "%");

const isPrivate = (value: unknown) =>
  typeof value === "object" && value !== null && (value as Profile).public === false;

const factText = (value: unknown): string[] => {
  if (typeof value === "string" || typeof value === "number") return [String(value)];
  if (Array.isArray(value)) return value.filter((item) => !isPrivate(item)).flatMap(factText);
  if (typeof value !== "object" || value === null || isPrivate(value)) return [];
  return Object.entries(value)
    .filter(([key]) => !NON_FACT_KEYS.has(key))
    .flatMap(([, child]) => factText(child));
};

/** All public fact text in the profile, normalised */
export const publicFacts = (profile: Profile) => normalise(factText(profile).join("\n"));

/** Trailing "." or "," belongs to the sentence, not the number */
const numbersIn = (text: string) =>
  (normalise(text).match(NUMBER_PATTERN) ?? []).map((token) => token.replace(/[.,]+$/, ""));

const appearsAsNumber = (token: string, facts: string) =>
  new RegExp(`(?<!\\d|\\d[.,])${escapeRegExp(token)}(?!\\d|%|[.,]\\d)`).test(facts);

/** Numbers in `text` that are not public facts in the profile */
export const unknownNumbers = (text: string, facts: string) =>
  [...new Set(numbersIn(text))].filter((token) => !appearsAsNumber(token, facts));

const privateMetrics = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.flatMap(privateMetrics);
  if (typeof value !== "object" || value === null) return [];
  if (isPrivate(value)) return ((value as Profile).metrics as string[] | undefined) ?? [];
  return Object.values(value).flatMap(privateMetrics);
};

const quotedPhrases = (line: string) => [...line.matchAll(QUOTED_PATTERN)].map((match) => match[1]);

/**
 * Blocked numbers from one never_claim line. Text in brackets and quotes is left out of the number scan,
 * since brackets hold the correction ("the measured run is 1,000 votes ramped over 60 s").
 * A number that is also a public fact is not blocked on its own.
 */
const blockedNumbers = (line: string, facts: string) => {
  const claim = line.replace(QUOTED_PATTERN, " ").replace(/\([^)]*\)/g, " ");
  const numbers = normalise(claim).match(CLAIM_NUMBER_PATTERN) ?? [];
  return numbers.map((token) => token.replace(/[.,]+$/, "")).filter((token) => !appearsAsNumber(token, facts));
};

const examples = (line: string) =>
  [...line.matchAll(EXAMPLES_PATTERN)].flatMap((match) => match[1].split(/,\s*|\s+and\s+/)).map((name) => name.trim());

const asStrings = (value: unknown): string[] =>
  Array.isArray(value) ? value.flat().filter((item): item is string => typeof item === "string") : [];

/** Phrases that must never appear: never_claim numbers and quotes, confidential names, public: false metrics */
export const blockedPhrases = (profile: Profile, facts: string) => {
  const neverClaim = (profile.never_claim ?? {}) as Profile;
  const claims = [...asStrings(neverClaim.removed_cv_claims), ...asStrings(neverClaim.never)];
  const confidential = asStrings(neverClaim.confidential);
  return [
    ...claims.flatMap(quotedPhrases),
    ...claims.flatMap((line) => blockedNumbers(line, facts)),
    ...confidential.flatMap(examples),
    ...privateMetrics(profile),
  ];
};

/** Blocked phrases found in `text`, matched case-insensitively and not inside a longer number or word */
export const blockedIn = (text: string, phrases: string[]) => {
  const content = normalise(text);
  return [...new Set(phrases)].filter((phrase) =>
    new RegExp(`(?<!\\w|\\d[.,])${escapeRegExp(normalise(phrase))}(?!\\d|[.,]\\d)`, "i").test(content),
  );
};
