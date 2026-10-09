"use client";

import { useState } from "react";

export const CopyEmailButton = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context): the address stays visible to copy by hand
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-sm border border-rule px-3 py-1.5 font-sans text-sm transition-colors hover:border-ink"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
};
