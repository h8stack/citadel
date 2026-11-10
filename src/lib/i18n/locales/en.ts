import { vi } from "./vi";

/**
 * English is the source copy: every key translates to itself. Generated from
 * the Vietnamese dictionary so the two locales always expose the same keys.
 */
export const en = Object.fromEntries(
	Object.keys(vi).map((key) => [key, key]),
) as Record<string, string>;
