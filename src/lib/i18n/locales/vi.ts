import { app } from "./vi/app";
import { book } from "./vi/book";
import { common } from "./vi/common";
import { library } from "./vi/library";
import { onboarding } from "./vi/onboarding";
import { settings } from "./vi/settings";
import { shell } from "./vi/shell";

/**
 * The Vietnamese dictionary. Keys are the English source copy, values are the
 * Vietnamese translation; a missing key falls back to English at runtime.
 */
export const vi: Record<string, string> = {
	...common,
	...app,
	...library,
	...book,
	...settings,
	...onboarding,
	...shell,
};
