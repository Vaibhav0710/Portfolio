import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { CONTACT_FORM } from "@/lib/constants";
import { ContactForm } from "./ContactForm";

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

const fill = (container: HTMLElement, name: string, value: string) => {
  const field = container.querySelector(`[name='${name}']`) as HTMLInputElement | HTMLTextAreaElement;
  field.value = value;
};

describe("ContactForm", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    act(() => root.render(<ContactForm />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  test("moves focus to the sent heading after a successful send", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ success: true }), { status: 200 })));
    fill(container, "name", "Recruiter");
    fill(container, "email", "recruiter@example.com");
    fill(container, "message", "Hello");

    await act(async () => {
      container.querySelector("form")?.requestSubmit();
    });

    const heading = container.querySelector("h3");
    expect(heading?.textContent).toBe(CONTACT_FORM.sentHeading);
    expect(document.activeElement).toBe(heading);
  });
});
