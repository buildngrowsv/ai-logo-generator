/**
 * useDailyUseTracker — client-side daily generation count tracker for free-tier conversion funneling.
 *
 * PURPOSE AND BUSINESS LOGIC:
 * This hook is the frontend counterpart to the server-side IP rate limiter.
 * The server blocks requests after 5 uses; this hook starts showing conversion
 * modals at use 3 — one step BEFORE the hard block. That way the user
 * experiences: "gentle nudge" → "email capture for 1 bonus gen" → "hard paywall"
 * instead of: "confusing server error" → frustration → churn.
 *
 * WHY LOCALSTORAGE (not server):
 * For the conversion modal threshold, we need extremely fast reads — no server
 * round-trip. The server's IP rate limiter is the actual enforcement mechanism;
 * this hook is purely for UX timing of the upgrade nudge. A mismatch between
 * client count and server count (e.g. after localStorage clear) means the user
 * might not see the modal — that's acceptable. The server will still stop them.
 *
 * RESET LOGIC:
 * Resets at midnight local time by comparing today's ISO date string to the
 * stored date. This matches the server's 24-hour rolling window conceptually
 * (not exactly, since server uses rolling 24h and this uses calendar day,
 * but close enough for conversion UX purposes).
 *
 * EMAIL CAPTURE:
 * Separately tracks whether this browser has submitted an email. Email
 * capture is a one-time event per browser — once captured, skip that modal.
 *
 * CREATED: 2026-03-28 by Custom 5 (conversion optimization sprint)
 * USED BY: src/app/[locale]/(main)/studio/page.tsx
 */

"use client";

import { useState, useEffect, useCallback } from "react";

/** localStorage key for the daily use counter record */
const DAILY_USE_KEY = "logoforge_daily_uses";

/** localStorage key for email capture state */
const EMAIL_CAPTURED_KEY = "logoforge_email_captured";

/**
 * The stored shape for the daily use record.
 * date is ISO date string (YYYY-MM-DD) for the current calendar day.
 * count is how many generations the user has completed today.
 */
interface DailyUseRecord {
  date: string;
  count: number;
}

/** Returns today's ISO date string (YYYY-MM-DD) in local time */
function getTodayDateString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/** Reads the current daily use record from localStorage, resetting if stale */
function readDailyUseRecord(): DailyUseRecord {
  if (typeof window === "undefined") return { date: getTodayDateString(), count: 0 };

  try {
    const raw = localStorage.getItem(DAILY_USE_KEY);
    if (!raw) return { date: getTodayDateString(), count: 0 };

    const parsed = JSON.parse(raw) as DailyUseRecord;
    const today = getTodayDateString();

    // If the stored date is not today, reset the counter
    if (parsed.date !== today) {
      return { date: today, count: 0 };
    }

    return parsed;
  } catch {
    // Corrupted localStorage — reset gracefully
    return { date: getTodayDateString(), count: 0 };
  }
}

/** Writes an updated daily use record to localStorage */
function writeDailyUseRecord(record: DailyUseRecord): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DAILY_USE_KEY, JSON.stringify(record));
  } catch {
    // localStorage write failed (private browsing quota, etc.) — ignore
  }
}

/** Returns whether this browser has already submitted an email capture */
function readEmailCaptured(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(EMAIL_CAPTURED_KEY) === "true";
  } catch {
    return false;
  }
}

/** Marks the email as captured in localStorage */
function markEmailCaptured(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(EMAIL_CAPTURED_KEY, "true");
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------------------
// Free tier limit at which we show the upgrade modal.
// Server hard-blocks at 5; we nudge at 3 to intercept the user before frustration.
// The email capture modal fires at attempt 4 (one chance to extend via email).
// ---------------------------------------------------------------------------
export const FREE_DAILY_LIMIT = 5;
export const UPGRADE_MODAL_THRESHOLD = 3;  // Show upgrade nudge after this many completions
export const EMAIL_GATE_ATTEMPT = 4;       // Show email capture on this attempt number

export interface UseDailyUseTrackerReturn {
  /** How many generations this user has completed today */
  todayCount: number;
  /** How many free generations remain (shows in header counter) */
  remainingFree: number;
  /** Whether the post-generation upgrade modal should show */
  showUpgradeModal: boolean;
  /** Whether the email capture gate modal should show */
  showEmailGate: boolean;
  /** Whether the user has already submitted their email */
  emailCaptured: boolean;
  /** Call after a successful generation to increment count and check thresholds */
  recordGeneration: () => void;
  /** Call when user attempts to generate but may hit a gate */
  checkGenerationAttempt: () => "allow" | "show_email_gate" | "show_upgrade_modal";
  /** Dismiss the upgrade modal */
  dismissUpgradeModal: () => void;
  /** Dismiss the email gate modal */
  dismissEmailGate: () => void;
  /** Mark email as captured (call after successful email submission) */
  captureEmail: () => void;
}

export function useDailyUseTracker(): UseDailyUseTrackerReturn {
  const [todayCount, setTodayCount] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    const record = readDailyUseRecord();
    setTodayCount(record.count);
    setEmailCaptured(readEmailCaptured());
  }, []);

  const remainingFree = Math.max(0, FREE_DAILY_LIMIT - todayCount);

  /**
   * recordGeneration — called after each successful API response.
   * Increments the counter and checks whether to show the upgrade modal.
   */
  const recordGeneration = useCallback(() => {
    const record = readDailyUseRecord();
    const newCount = record.count + 1;
    const newRecord: DailyUseRecord = { date: getTodayDateString(), count: newCount };
    writeDailyUseRecord(newRecord);
    setTodayCount(newCount);

    // After completing UPGRADE_MODAL_THRESHOLD or more generations today,
    // show the upgrade nudge. We do this AFTER completion (not before) so
    // the user has already experienced value — making the upgrade ask timely.
    if (newCount >= UPGRADE_MODAL_THRESHOLD) {
      setShowUpgradeModal(true);
    }
  }, []);

  /**
   * checkGenerationAttempt — called BEFORE sending the generation request.
   * Returns what should happen: allow, show email gate, or show upgrade modal.
   *
   * Logic:
   * - Attempt N where N <= UPGRADE_MODAL_THRESHOLD: allow (post-gen modal will fire after)
   * - Attempt N where N == EMAIL_GATE_ATTEMPT and no email captured: show email gate
   * - Attempt N where N > UPGRADE_MODAL_THRESHOLD and email captured: show upgrade modal
   * - Attempt N where N >= FREE_DAILY_LIMIT: show upgrade modal (server will block anyway)
   */
  const checkGenerationAttempt = useCallback((): "allow" | "show_email_gate" | "show_upgrade_modal" => {
    const record = readDailyUseRecord();
    const attemptNumber = record.count + 1; // This would be the Nth generation

    if (attemptNumber >= FREE_DAILY_LIMIT) {
      setShowUpgradeModal(true);
      return "show_upgrade_modal";
    }

    if (attemptNumber === EMAIL_GATE_ATTEMPT && !readEmailCaptured()) {
      setShowEmailGate(true);
      return "show_email_gate";
    }

    return "allow";
  }, []);

  const dismissUpgradeModal = useCallback(() => setShowUpgradeModal(false), []);
  const dismissEmailGate = useCallback(() => setShowEmailGate(false), []);

  const captureEmail = useCallback(() => {
    markEmailCaptured();
    setEmailCaptured(true);
    setShowEmailGate(false);
    // Reward with 1 bonus generation — bump remaining count visually
    // The actual server-side allowance comes from the email bonus endpoint
  }, []);

  return {
    todayCount,
    remainingFree,
    showUpgradeModal,
    showEmailGate,
    emailCaptured,
    recordGeneration,
    checkGenerationAttempt,
    dismissUpgradeModal,
    dismissEmailGate,
    captureEmail,
  };
}
