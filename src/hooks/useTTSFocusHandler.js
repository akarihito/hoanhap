import { useEffect, useRef } from "react";
import { useAccessibility } from "../contexts/AccessibilityContext";

/**
 * useTTSFocusHandler — Global Text-to-Speech on Focus/Hover
 *
 * When `screenReader` is active in AccessibilityContext, this hook
 * attaches document-level event listeners that:
 *
 * 1. On `focusin` (Tab into element): extracts descriptive text and speaks it.
 * 2. On `mouseover` (hover on interactive element): same behavior.
 * 3. On `focusout` / `mouseout`: cancels current speech immediately
 *    to prevent overlapping audio queues.
 *
 * Text extraction priority:
 *   aria-label → alt → aria-describedby target → innerText (trimmed)
 *
 * This hook should be mounted once in MainLayout.
 */

// ── Interactive element selectors ──
const INTERACTIVE_SELECTOR =
  'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"], [role="link"], [role="menuitem"]';

// ── Text content selectors (for hover-to-read on text blocks) ──
const TEXT_SELECTOR = "h1, h2, h3, h4, h5, h6, p, li, td, th, label, figcaption, blockquote";

/**
 * Extract the most descriptive text from an element.
 * Priority: aria-label > alt > aria-describedby > visible text
 */
function extractText(el) {
  if (!el) return "";

  // If the element itself is hidden, don't read it
  if (el.getAttribute("aria-hidden") === "true") return "";

  // If the element itself is an icon, don't read it
  if (
    el.classList?.contains("material-symbols-outlined") ||
    el.classList?.contains("icon") ||
    el.tagName?.toLowerCase() === "svg"
  ) {
    return "";
  }

  // 1. aria-label
  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel?.trim()) return ariaLabel.trim();

  // 2. alt (for images)
  const alt = el.getAttribute("alt");
  if (alt?.trim()) return alt.trim();

  // 3. aria-describedby — read the referenced element's text
  const describedById = el.getAttribute("aria-describedby");
  if (describedById) {
    const descEl = document.getElementById(describedById);
    if (descEl) {
      const descClone = descEl.cloneNode(true);
      const icons = descClone.querySelectorAll(".material-symbols-outlined, [aria-hidden='true'], svg, .icon, i");
      icons.forEach((icon) => icon.remove());
      const descText = descClone.textContent?.trim() || "";
      if (descText) return descText;
    }
  }

  // 4. title attribute
  const title = el.getAttribute("title");
  if (title?.trim()) return title.trim();

  // 5. Inner text (limit to 200 chars, with icons removed)
  const clone = el.cloneNode(true);
  const icons = clone.querySelectorAll(".material-symbols-outlined, [aria-hidden='true'], svg, .icon, i");
  icons.forEach((icon) => icon.remove());
  
  const text = clone.textContent?.trim() || "";
  return text.length > 200 ? text.substring(0, 200) + "..." : text;
}

/**
 * Check if an element is interactive or a readable text block
 */
function isReadableElement(el) {
  if (!el) return false;
  return el.matches(INTERACTIVE_SELECTOR) || el.matches(TEXT_SELECTOR);
}

export default function useTTSFocusHandler() {
  const { state, speakText, stopSpeaking } = useAccessibility();
  const debounceRef = useRef(null);

  const stateRef = useRef(state.screenReader);
  useEffect(() => {
    stateRef.current = state.screenReader;
  }, [state.screenReader]);

  useEffect(() => {
    // We attach listeners globally once, and use stateRef to decide whether to speak.
    // This prevents any issues with listeners not being removed properly.
    
    function debouncedSpeak(text) {
      if (!stateRef.current) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        speakText(text);
      }, 150);
    }

    // ── Focus handler (keyboard Tab navigation) ──
    function handleFocusIn(e) {
      if (!stateRef.current) return;
      const el = e.target;
      if (!el || el === document.body) return;

      // Read any focusable or readable element
      const text = extractText(el);
      if (text) {
        stopSpeaking(); // Cancel any in-progress speech
        debouncedSpeak(text);
      }
    }

    // ── Hover handler (mouse users) ──
    function handleMouseOver(e) {
      if (!stateRef.current) return;
      const el = e.target?.closest?.(INTERACTIVE_SELECTOR) ||
                 e.target?.closest?.(TEXT_SELECTOR);
      if (!el) return;

      const text = extractText(el);
      if (text) {
        stopSpeaking();
        debouncedSpeak(text);
      }
    }

    // ── Cancel speech on focus/hover leave ──
    function handleLeave() {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      stopSpeaking();
    }

    // Attach listeners at the document level (delegation)
    document.addEventListener("focusin", handleFocusIn, true);
    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("focusout", handleLeave, true);
    document.addEventListener("mouseout", handleLeave, true);

    return () => {
      document.removeEventListener("focusin", handleFocusIn, true);
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("focusout", handleLeave, true);
      document.removeEventListener("mouseout", handleLeave, true);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      // We don't stopSpeaking here to avoid interrupting intentional speech
    };
  }, [speakText, stopSpeaking]);
}
