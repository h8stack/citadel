import type { HealthCheck } from "@/lib/services/server";

/** The name an administrator reads for each health check. The values are the
 * English source copy, translated by the UI at render time. */
export const HEALTH_CHECK_LABELS: Record<string, string> = {
	database: "Citadel's database",
	providerKeys: "Saved provider keys",
	library: "Library",
	webApp: "Web app",
	opds: "E-readers (OPDS)",
	metadata: "Book lookups",
	stateDisk: "Space for Citadel's data",
	libraryDisk: "Space for the library",
};

/**
 * A check's label, passed through `translate` when the caller has one. The
 * default keeps this module free of i18n state so non-UI callers (tests,
 * monitors) still read the English source copy.
 */
export const healthCheckLabel = (
	check: HealthCheck,
	translate: (label: string) => string = (label) => label,
): string => {
	const label = HEALTH_CHECK_LABELS[check.name];
	return label ? translate(label) : check.name;
};

/** Checks that need attention first, in the server's order otherwise. */
export const healthChecksInOrder = (checks: HealthCheck[]): HealthCheck[] => {
	const rank = { failing: 0, degraded: 1, ok: 2 } as const;
	return checks
		.map((check, index) => ({ check, index }))
		.sort(
			(a, b) =>
				rank[a.check.status] - rank[b.check.status] || a.index - b.index,
		)
		.map(({ check }) => check);
};
