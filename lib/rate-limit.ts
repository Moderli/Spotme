// ============================================================
// lib/rate-limit.ts — Lightweight in-memory rate limiter
//
// Uses a sliding-window counter per key (e.g. IP address).
// Designed for use in Next.js API routes to protect public
// endpoints from spam/abuse without requiring Redis.
//
// NOTE: State is per-process. On multi-instance deployments
// (e.g. serverless, horizontal scaling) replace the Map with
// a Redis-backed counter (e.g. Upstash Rate Limit).
// ============================================================

interface RateLimitEntry {
  count: number;
  resetAt: number; // Unix ms timestamp
}

const store = new Map<string, RateLimitEntry>();

// Periodically clean up expired keys to avoid memory leaks (~every 5 min)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt <= now) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Check whether a key has exceeded its rate limit.
 *
 * @param key       Identifier to rate-limit (e.g. IP address).
 * @param limit     Maximum requests allowed in the window.
 * @param windowMs  Length of the window in milliseconds.
 * @returns         `{ allowed: boolean, remaining: number, resetAt: number }`
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    // New window
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}
