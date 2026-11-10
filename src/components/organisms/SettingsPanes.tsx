import type { KeyboardEvent, ReactNode } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { F7BookFill } from "@/components/icons/F7BookFill";
import { F7Gear } from "@/components/icons/F7Gear";
import { F7Wifi } from "@/components/icons/F7Wifi";
import { FluentLibraryFilled } from "@/components/icons/FluentLibraryFilled";
import { CurrentLibraryCard } from "@/components/molecules/CurrentLibraryCard";
import {
	type AddLibraryResult,
	LibraryListCard,
} from "@/components/molecules/LibraryListCard";
import { SoftwareUpdateRow } from "@/components/molecules/SoftwareUpdateRow";
import {
	ServerProviderKey,
	serverKeyStatus,
} from "@/components/organisms/ServerProviderKey";
import { GlobeGlyph } from "@/components/organisms/SetupCard";
import classes from "@/components/organisms/SettingsPanes.module.css";
import { SharingSettings } from "@/components/organisms/SharingSettings";
import {
	Button,
	InlineLink,
	SegmentedControl,
	Switch,
	TextInput,
	Tooltip,
} from "@/components/ui";
import { useLibrarySelection } from "@/lib/hooks/use-library-selection";
import { applyLanguage } from "@/lib/i18n";
import {
	DEFAULT_LANGUAGE,
	LANGUAGE_NAMES,
	Language,
	isLanguage,
} from "@/lib/i18n/language";
import { useProviderCredential } from "@/lib/hooks/use-provider-credentials";
import { useBrowserSessionControls } from "@/lib/hooks/use-browser-session";
import { useServerAddresses } from "@/lib/hooks/use-server-addresses";
import { useServerHealth } from "@/lib/hooks/use-server-health";
import { healthCheckLabel, healthChecksInOrder } from "@/lib/server-health";
import { useSoftwareUpdate } from "@/lib/hooks/use-software-update";
import { getAdapter, getDescriptor } from "@/lib/metadata-providers/registry";
import type { ProviderId } from "@/lib/metadata-providers/types";
import { usePlatform } from "@/lib/platform/context";
import {
	SettingsSection,
	type TSettingsSection,
} from "@/lib/settings-sections";
import { applyColorScheme } from "@/lib/theme-manager";
import {
	providerKeysOnServer,
	useAnySourceEnabled,
	useProviderKeyAvailable,
} from "@/stores/settings/metadata-providers";
import { useSettings } from "@/stores/settings/store";

/** The desktop Settings window's tabs; the browser uses SettingsPage. */
const SETTINGS_TABS = [
	"general",
	"library",
	"sharing",
	"integrations",
] as const;
type SettingsTab = (typeof SETTINGS_TABS)[number];

/** The tabs' labels are English source copy; the strip translates them. */
const TAB_META: Record<
	SettingsTab,
	{ label: string; icon: (className: string | undefined) => ReactNode }
> = {
	general: {
		label: "General",
		icon: (className) => <F7Gear className={className} />,
	},
	library: {
		label: "Library",
		icon: (className) => <FluentLibraryFilled className={className} />,
	},
	sharing: {
		label: "Sharing",
		icon: (className) => <F7Wifi className={className} />,
	},
	integrations: {
		label: "Sources",
		icon: (className) => <F7BookFill className={className} />,
	},
};

/**
 * Classic macOS preferences layout (iTerm2 / pre-Ventura System Preferences):
 * a centered icon-over-label tab strip across the top, a hairline divider,
 * then the active pane on the window chrome background. The window uses an
 * overlay title bar with the native title hidden (menu.rs), so the strip is
 * the top of the window and doubles as the drag region; the traffic lights
 * overlay its left edge.
 */
export const SettingsPanes = () => {
	const { t } = useTranslation();
	const platform = usePlatform();
	const [activeTab, setActiveTab] = useState<SettingsTab>("general");

	// The badged gear and Citadel → Check for Updates… land here; the window
	// outlives its last close, so it may still be on another tab.
	useEffect(() => {
		let cancelled = false;
		let unlisten: (() => void) | undefined;
		void platform.updates
			.onShowRequested(() => setActiveTab("general"))
			.then((stop) => {
				if (cancelled) stop();
				else unlisten = stop;
			});
		return () => {
			cancelled = true;
			unlisten?.();
		};
	}, [platform]);

	const tabRefs = useRef<
		Partial<Record<SettingsTab, HTMLButtonElement | null>>
	>({});
	const baseId = useId();

	const tabId = (tab: SettingsTab) => `${baseId}-tab-${tab}`;
	const panelId = (tab: SettingsTab) => `${baseId}-panel-${tab}`;

	const selectAndFocusTab = useCallback((tab: SettingsTab) => {
		setActiveTab(tab);
		tabRefs.current[tab]?.focus();
	}, []);

	// Automatic activation: arrows move both focus and selection, macOS style.
	const handleTabKeyDown = useCallback(
		(event: KeyboardEvent<HTMLButtonElement>) => {
			const index = SETTINGS_TABS.indexOf(activeTab);
			let next: SettingsTab | undefined;
			switch (event.key) {
				case "ArrowRight":
					next = SETTINGS_TABS[(index + 1) % SETTINGS_TABS.length];
					break;
				case "ArrowLeft":
					next =
						SETTINGS_TABS[
							(index - 1 + SETTINGS_TABS.length) % SETTINGS_TABS.length
						];
					break;
				case "Home":
					next = SETTINGS_TABS[0];
					break;
				case "End":
					next = SETTINGS_TABS[SETTINGS_TABS.length - 1];
					break;
				default:
					return;
			}
			event.preventDefault();
			if (next) selectAndFocusTab(next);
		},
		[activeTab, selectAndFocusTab],
	);

	return (
		<div className={classes.pane}>
			<div
				role="tablist"
				aria-label={t("Settings sections")}
				className={classes.tabStrip}
				data-tauri-drag-region
			>
				{SETTINGS_TABS.map((tab) => (
					<button
						key={tab}
						ref={(node) => {
							tabRefs.current[tab] = node;
						}}
						type="button"
						role="tab"
						id={tabId(tab)}
						aria-selected={tab === activeTab}
						aria-controls={panelId(tab)}
						tabIndex={tab === activeTab ? 0 : -1}
						className={classes.tab}
						onClick={() => setActiveTab(tab)}
						onKeyDown={handleTabKeyDown}
					>
						<span className={classes.tabIcon} aria-hidden="true">
							{TAB_META[tab].icon(classes.tabIconGlyph)}
						</span>
						<span className={classes.tabLabel}>{t(TAB_META[tab].label)}</span>
					</button>
				))}
			</div>
			<div
				role="tabpanel"
				id={panelId(activeTab)}
				aria-labelledby={tabId(activeTab)}
				className={classes.panel}
			>
				<div className={classes.panelInner}>
					{activeTab === "general" && <GeneralTab />}
					{activeTab === "library" && <LibraryTab />}
					{activeTab === "sharing" && <SharingSettings />}
					{activeTab === "integrations" && <IntegrationsTab />}
				</div>
			</div>
		</div>
	);
};

/** The sections the browser's in-app Settings page offers. */
export const BROWSER_SETTINGS_SECTIONS: readonly TSettingsSection[] =
	providerKeysOnServer
		? [SettingsSection.general, SettingsSection.metadata]
		: [SettingsSection.general];

interface SettingsSectionContentProps {
	section: TSettingsSection;
}

/** One section of the browser's Settings page, without any surrounding chrome. */
export const SettingsSectionContent = ({
	section,
}: SettingsSectionContentProps) => {
	switch (section) {
		case SettingsSection.general:
			return <GeneralTab />;
		case SettingsSection.metadata:
			return <IntegrationsTab />;
	}
};

interface SettingsRowProps {
	label: string;
	description?: string;
	control: ReactNode;
	/** When set, the row label becomes a <label> for that control id. */
	htmlFor?: string;
}

const SettingsRow = ({
	label,
	description,
	control,
	htmlFor,
}: SettingsRowProps) => {
	return (
		<div className={classes.row}>
			<div className={classes.rowLabels}>
				{htmlFor ? (
					<label className={classes.rowLabel} htmlFor={htmlFor}>
						{label}
					</label>
				) : (
					<span className={classes.rowLabel}>{label}</span>
				)}
				{description && (
					<span className={classes.rowDescription}>{description}</span>
				)}
			</div>
			{control}
		</div>
	);
};

const GeneralTab = () => {
	const { t } = useTranslation();
	const theme = useSettings((state) => state.theme);
	const setTheme = useSettings((state) => state.setTheme);
	const language = useSettings((state) => state.language);
	const setLanguage = useSettings((state) => state.setLanguage);
	const autoUpdateCheckingEnabled = useSettings(
		(state) => state.autoUpdateCheckingEnabled,
	);
	const setAutoUpdateCheckingEnabled = useSettings(
		(state) => state.setAutoUpdateCheckingEnabled,
	);
	const autoUpdateSwitchId = useId();

	const platform = usePlatform();
	const supportsAutoUpdates = platform.capabilities.supportsAutoUpdates;
	const softwareUpdate = useSoftwareUpdate();
	const administrator = useBrowserSessionControls()?.administrator ?? false;

	const applyTheme = useCallback(
		(value: string) => {
			const scheme =
				value === "light" || value === "dark" ? value : ("auto" as const);
			applyColorScheme(scheme);
			void setTheme(scheme);
		},
		[setTheme],
	);

	const applyLanguageSetting = useCallback(
		(value: string) => {
			const next = isLanguage(value) ? value : DEFAULT_LANGUAGE;
			applyLanguage(next);
			void setLanguage(next);
		},
		[setLanguage],
	);

	return (
		<div className={classes.groups}>
			{administrator && <ServerProblemsNotice />}
			<div className={classes.group}>
				<SettingsRow
					label={t("Appearance")}
					control={
						<SegmentedControl
							aria-label={t("Appearance")}
							value={theme}
							onChange={applyTheme}
							items={[
								{ value: "auto", label: t("Auto") },
								{ value: "light", label: t("Light") },
								{ value: "dark", label: t("Dark") },
							]}
						/>
					}
				/>
				<SettingsRow
					label={t("Language")}
					control={
						<SegmentedControl
							aria-label={t("Language")}
							value={language}
							onChange={applyLanguageSetting}
							items={[
								{ value: Language.vietnamese, label: LANGUAGE_NAMES.vi },
								{ value: Language.english, label: LANGUAGE_NAMES.en },
							]}
						/>
					}
				/>
			</div>
			{/* The app checks on its own schedule only on the desktop; a server's
			    checks are set where it runs. */}
			{(supportsAutoUpdates || softwareUpdate) && (
				<div className={classes.group}>
					{supportsAutoUpdates && (
						<SettingsRow
							label={t("Check for updates automatically")}
							htmlFor={autoUpdateSwitchId}
							control={
								<Switch
									id={autoUpdateSwitchId}
									checked={autoUpdateCheckingEnabled}
									onCheckedChange={(checked) =>
										void setAutoUpdateCheckingEnabled(checked)
									}
								/>
							}
						/>
					)}
					{softwareUpdate && (
						<SoftwareUpdateRow
							state={softwareUpdate.state}
							onCheck={softwareUpdate.check}
							onLater={softwareUpdate.later}
							onUpdateNow={softwareUpdate.updateNow}
							onRestartNow={softwareUpdate.updateNow}
						/>
					)}
				</div>
			)}
			{administrator && <ServerAddressesSection />}
		</div>
	);
};

/**
 * What an administrator should fix, if anything: the server's checks that
 * aren't fine, with their reasons. Nothing when all is well; monitors use
 * /api/health for the full picture.
 */
const ServerProblemsNotice = () => {
	const { t } = useTranslation();
	const { health } = useServerHealth();
	const problems = health
		? healthChecksInOrder(health.checks).filter(
				(check) => check.status !== "ok",
			)
		: [];
	if (problems.length === 0) return null;
	return (
		<section
			className={classes.problems}
			data-status={health?.status}
			aria-label={t("Citadel needs attention")}
		>
			<h3 className={classes.problemsTitle}>{t("Citadel needs attention")}</h3>
			<ul className={classes.problemsList}>
				{problems.map((check) => (
					<li key={check.name}>
						<span className={classes.problemName}>
							{healthCheckLabel(check, (label) => t(label))}
						</span>
						{check.detail && (
							<span className={classes.problemDetail}>{check.detail}</span>
						)}
					</li>
				))}
			</ul>
		</section>
	);
};

/** Where people reach this server. Set by whoever runs it, not from here. */
const ServerAddressesSection = () => {
	const { t } = useTranslation();
	const { addresses, error } = useServerAddresses();
	const headingId = useId();
	const always = addresses?.alwaysIncluded ?? null;
	const listed =
		addresses?.addresses.filter((address) => address.url !== always) ?? [];
	const current = addresses?.current ?? null;
	const where = addresses?.configFile
		? t("add publicUrls to {{file}}", { file: addresses.configFile })
		: t("set CITADEL_PUBLIC_URLS in the server’s environment");
	return (
		<section aria-labelledby={headingId}>
			<h3 id={headingId} className={classes.sectionTitle}>
				{addresses && listed.length === 0
					? t("Public URLs")
					: t("Configured public URLs")}
			</h3>
			{addresses &&
				(listed.length > 0 ? (
					<>
						<p className={classes.paneNote}>
							{t(
								"Only traffic sent to these URLs is accepted by Citadel. To add more, update the server’s configuration.",
							)}
						</p>
						<ul className={classes.urlWell}>
							{listed.map((address) => (
								<PublicUrlLine
									key={address.url}
									url={address.url}
									current={address.url === current}
								/>
							))}
							{always && (
								<PublicUrlLine
									url={always}
									current={always === current}
									always
								/>
							)}
						</ul>
					</>
				) : (
					<p className={classes.paneNote}>
						{t(
							"None are configured, so Citadel accepts traffic at any URL. To limit it, {{where}}, then restart the server.",
							{ where },
						)}
					</p>
				))}
			{error && (
				<p role="alert" className={classes.inlineNote} data-tone="error">
					{error}
				</p>
			)}
		</section>
	);
};

interface PublicUrlLineProps {
	url: string;
	current: boolean;
	always?: boolean;
}

const PublicUrlLine = ({
	url,
	current,
	always = false,
}: PublicUrlLineProps) => {
	const { t } = useTranslation();
	return (
		<li className={classes.urlLine} data-always={always || undefined}>
			<GlobeGlyph />
			<span className={classes.urlText}>{url}</span>
			{current && <span className={classes.currentPill}>{t("current")}</span>}
			{always && (
				<Tooltip label={t("Always included")} openDelay={150}>
					<button
						type="button"
						className={classes.alwaysInfo}
						aria-label={t("Always included")}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							aria-hidden="true"
						>
							<circle
								cx="8"
								cy="8"
								r="7.25"
								stroke="currentColor"
								strokeOpacity="0.55"
								strokeWidth="1"
							/>
							<circle cx="8" cy="4.9" r="0.95" fill="currentColor" />
							<path
								d="M8 7.2v4.4"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				</Tooltip>
			)}
		</li>
	);
};

const LibraryTab = () => {
	const { t } = useTranslation();
	const { libraries, activeLibrary, switchTo, adoptLibrary } =
		useLibrarySelection();
	const platform = usePlatform();

	const addLibrary = useCallback(async (): Promise<AddLibraryResult | null> => {
		const path = await platform.dialogs.openDirectory({
			title: t("Choose a Calibre Library Folder"),
		});
		if (path === null) return null;
		// Settings stays open, as when switching from the list: the new
		// library's row becomes current once it has opened.
		return adoptLibrary(path);
	}, [platform, adoptLibrary, t]);

	const revealActiveLibrary = useCallback(() => {
		if (!activeLibrary) return;
		void platform.fileOpener.revealInFileManager(activeLibrary.absolutePath);
	}, [platform, activeLibrary]);

	if (!activeLibrary) {
		return (
			<p className={classes.paneNote}>
				{t("Something went wrong loading your libraries.")}
			</p>
		);
	}

	return (
		<div className={classes.groups}>
			<LibraryListCard
				currentLibraryId={activeLibrary.id}
				libraries={libraries}
				onSwitchLibrary={switchTo}
				onAddLibrary={addLibrary}
			/>
			<CurrentLibraryCard
				library={activeLibrary}
				onRevealInFileManager={
					platform.capabilities.canRevealInFileManager
						? revealActiveLibrary
						: null
				}
			/>
		</div>
	);
};

interface TestResult {
	success: boolean;
	message: string;
}

interface ProviderRowShellProps {
	id: ProviderId;
	/** Shown under the name only where a provider needs setting up. */
	status: string | null;
	/** No usable key yet: offer the key field instead of the switch. */
	needsSetup?: boolean;
	children: ReactNode;
}

/** A source's name, status and switch over an expandable body. */
const ProviderRowShell = ({
	id,
	status,
	needsSetup = false,
	children,
}: ProviderRowShellProps) => {
	const { t } = useTranslation();
	const descriptor = getDescriptor(id);
	const enabled = useSettings(
		(state) => state.metadataProviders.configs[id]?.enabled ?? false,
	);
	const setProviderEnabled = useSettings((state) => state.setProviderEnabled);
	const switchId = useId();
	const [expanded, setExpanded] = useState(false);
	const keyHelpUrl = descriptor.keyHelpUrl;

	return (
		<div className={classes.providerRow}>
			<div className={classes.providerHeader}>
				<button
					type="button"
					className={classes.providerDisclosure}
					aria-expanded={expanded}
					aria-label={
						expanded
							? t("Collapse {{provider}}", {
									provider: descriptor.displayName,
								})
							: t("Expand {{provider}}", {
									provider: descriptor.displayName,
								})
					}
					onClick={() => setExpanded((open) => !open)}
				>
					<span className={classes.providerChevron} data-open={expanded}>
						›
					</span>
				</button>
				<div className={classes.rowLabels}>
					<span className={classes.rowLabel}>{descriptor.displayName}</span>
					{status && <span className={classes.rowDescription}>{status}</span>}
				</div>
				{needsSetup && !enabled ? (
					// Switching on a source that has no key would do nothing; the
					// one useful step is the key, so offer that instead.
					<Button variant="default" onClick={() => setExpanded(true)}>
						{t("Add Key…")}
					</Button>
				) : (
					<Switch
						id={switchId}
						checked={enabled}
						aria-label={t("Enable {{provider}}", {
							provider: descriptor.displayName,
						})}
						onCheckedChange={(checked) => void setProviderEnabled(id, checked)}
					/>
				)}
			</div>
			{expanded && (
				<div className={classes.providerBody}>
					<p className={classes.rowDescription}>
						{t(descriptor.blurb)}
						{keyHelpUrl && (
							<>
								{" "}
								<InlineLink href={keyHelpUrl} isExternal>
									{t("How to get a key")}
								</InlineLink>
							</>
						)}
					</p>
					{children}
				</div>
			)}
		</div>
	);
};

/** A keyed source whose key the signed-in user keeps on the server. */
const ServerKeyProviderRow = ({ id }: { id: ProviderId }) => {
	const controller = useProviderCredential(id);
	const status = serverKeyStatus(controller);
	return (
		<ProviderRowShell
			id={id}
			status={status.label}
			needsSetup={status.needsSetup}
		>
			<ServerProviderKey id={id} controller={controller} />
		</ProviderRowShell>
	);
};

/** A source used straight from this app, with its key (if any) kept here. */
const LocalProviderRow = ({ id }: { id: ProviderId }) => {
	const { t } = useTranslation();
	const descriptor = getDescriptor(id);
	const config = useSettings((state) => state.metadataProviders.configs[id]);
	const setProviderConfig = useSettings((state) => state.setProviderConfig);

	const enabled = config?.enabled ?? false;
	const requiresKey = descriptor.capabilities.requiresKey;
	const savedKey = config?.apiKey ?? "";
	const hasKey = useProviderKeyAvailable()(id);

	const [apiKeyInput, setApiKeyInput] = useState(savedKey);
	const [isTesting, setIsTesting] = useState(false);
	const [testResult, setTestResult] = useState<TestResult | null>(null);

	const needsSetup = requiresKey && !hasKey;
	const status = requiresKey
		? hasKey
			? t("Key saved")
			: t("Requires setup")
		: null;

	const handleTest = useCallback(async () => {
		setIsTesting(true);
		setTestResult(null);
		try {
			const result = await getAdapter(id).test({
				apiKey: requiresKey ? apiKeyInput : "",
			});
			setTestResult({
				success: result.ok,
				message: result.ok ? t("Reachable.") : result.message,
			});
		} catch (error) {
			setTestResult({
				success: false,
				message: t("Error: {{message}}", {
					message: error instanceof Error ? error.message : String(error),
				}),
			});
		} finally {
			setIsTesting(false);
		}
	}, [id, requiresKey, apiKeyInput, t]);

	const handleSaveKey = useCallback(async () => {
		await setProviderConfig(id, {
			apiKey: apiKeyInput,
			enabled: apiKeyInput.trim().length > 0 ? true : enabled,
		});
		setTestResult(null);
	}, [id, apiKeyInput, enabled, setProviderConfig]);

	const handleClearKey = useCallback(async () => {
		setApiKeyInput("");
		await setProviderConfig(id, { apiKey: "", enabled: false });
		setTestResult(null);
	}, [id, setProviderConfig]);

	return (
		<ProviderRowShell id={id} status={status} needsSetup={needsSetup}>
			{requiresKey ? (
				<form
					className={classes.keyForm}
					onSubmit={(event) => {
						event.preventDefault();
						if (apiKeyInput && !isTesting) void handleSaveKey();
					}}
				>
					<TextInput
						className={classes.keyInput}
						type="password"
						autoComplete="off"
						placeholder={t("API key")}
						aria-label={t("{{provider}} API key", {
							provider: descriptor.displayName,
						})}
						value={apiKeyInput}
						onChange={(event) => setApiKeyInput(event.currentTarget.value)}
					/>
					<div className={classes.rowActions}>
						<Button
							variant="default"
							disabled={!apiKeyInput || isTesting}
							onClick={() => void handleClearKey()}
						>
							{t("Clear")}
						</Button>
						<Button
							variant="default"
							disabled={!apiKeyInput || isTesting}
							onClick={() => void handleTest()}
						>
							{isTesting ? t("Testing…") : t("Test")}
						</Button>
						<Button
							variant="primary"
							type="submit"
							disabled={!apiKeyInput || isTesting}
						>
							{t("Save")}
						</Button>
					</div>
				</form>
			) : (
				<div className={classes.rowActions}>
					<Button
						variant="default"
						disabled={isTesting}
						onClick={() => void handleTest()}
					>
						{isTesting ? t("Testing…") : t("Test")}
					</Button>
				</div>
			)}
			{testResult && (
				<p
					className={classes.inlineNote}
					data-tone={testResult.success ? "ok" : "error"}
					role="status"
				>
					{testResult.message}
				</p>
			)}
		</ProviderRowShell>
	);
};

const ProviderRow = ({ id }: { id: ProviderId }) =>
	providerKeysOnServer && getDescriptor(id).capabilities.requiresKey ? (
		<ServerKeyProviderRow id={id} />
	) : (
		<LocalProviderRow id={id} />
	);

const IntegrationsTab = () => {
	const { t } = useTranslation();
	const preferenceOrder = useSettings(
		(state) => state.metadataProviders.preferenceOrder,
	);
	const autoLookup = useSettings(
		(state) => state.metadataProviders.autoLookupOnImport,
	);
	const setAutoLookupOnImport = useSettings(
		(state) => state.setAutoLookupOnImport,
	);
	const anySourceEnabled = useAnySourceEnabled();
	const autoLookupSwitchId = useId();

	return (
		<div className={classes.groups}>
			<div>
				<p className={classes.paneNote}>
					{t(
						"Search these sources for titles, authors and other details when you add or edit a book.",
					)}
				</p>
				<div className={classes.group}>
					{preferenceOrder.map((id) => (
						<ProviderRow key={id} id={id} />
					))}
				</div>
			</div>
			<div>
				<div className={classes.group}>
					<SettingsRow
						label={t("Search automatically when adding books")}
						htmlFor={autoLookupSwitchId}
						description={
							anySourceEnabled
								? t("For files that include an ISBN.")
								: t("Turn on a source above to use this.")
						}
						control={
							<Switch
								id={autoLookupSwitchId}
								checked={autoLookup}
								disabled={!anySourceEnabled}
								onCheckedChange={(checked) =>
									void setAutoLookupOnImport(checked)
								}
							/>
						}
					/>
				</div>
			</div>
		</div>
	);
};
