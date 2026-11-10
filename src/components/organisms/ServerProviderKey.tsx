import { useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "@/components/organisms/SettingsPanes.module.css";
import { Button, TextInput } from "@/components/ui";
import i18next from "@/lib/i18n";
import {
	CREDENTIAL_BUSY,
	type ProviderCredentialController,
} from "@/lib/hooks/use-provider-credentials";
import { getDescriptor } from "@/lib/metadata-providers/registry";
import type { ProviderId } from "@/lib/metadata-providers/types";

const formatDate = (date: Date): string =>
	date.toLocaleDateString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

/** A keyed provider's status line when the server keeps the user's key. */
export interface ServerKeyStatus {
	label: string;
	/** No usable key yet, so adding one is the only useful action. */
	needsSetup: boolean;
}

/** What to show for a provider whose key lives on the server. */
export const serverKeyStatus = ({
	saved,
	loading,
}: ProviderCredentialController): ServerKeyStatus => {
	if (loading) return { label: i18next.t("Checking…"), needsSetup: false };
	if (!saved) return { label: i18next.t("Requires setup"), needsSetup: true };
	if (saved.needsReentry)
		return { label: i18next.t("Enter your key again"), needsSetup: true };
	return {
		label: saved.accountName
			? i18next.t("Connected as {{name}}", { name: saved.accountName })
			: i18next.t("Key saved"),
		needsSetup: false,
	};
};

interface ServerProviderKeyProps {
	id: ProviderId;
	controller: ProviderCredentialController;
}

/** The signed-in user's key for one provider: a field to add it, or its details. */
export const ServerProviderKey = ({
	id,
	controller,
}: ServerProviderKeyProps) => {
	const { t } = useTranslation();
	const descriptor = getDescriptor(id);
	const { saved, loading, busy, notice } = controller;
	const [draft, setDraft] = useState("");
	const working = busy !== CREDENTIAL_BUSY.idle;
	const showForm = !saved || saved.needsReentry;

	return (
		<>
			{saved && !saved.needsReentry && (
				<p className={classes.rowDescription}>
					{t("Added {{date}}", { date: formatDate(saved.createdAt) })}
					{saved.verifiedAt &&
						` · ${t("last checked {{date}}", {
							date: formatDate(saved.verifiedAt),
						})}`}
				</p>
			)}
			{saved?.needsReentry && (
				<p className={classes.inlineNote} data-tone="error">
					{t(
						"This server can no longer read your saved key. Enter it again to keep using {{provider}}.",
						{ provider: descriptor.displayName },
					)}
				</p>
			)}
			{showForm ? (
				<form
					className={classes.keyForm}
					onSubmit={(event) => {
						event.preventDefault();
						void controller.save(draft).then((ok) => {
							if (ok) setDraft("");
						});
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
						value={draft}
						onChange={(event) => setDraft(event.currentTarget.value)}
					/>
					<div className={classes.rowActions}>
						<Button
							variant="primary"
							type="submit"
							disabled={!draft.trim() || working || loading}
						>
							{busy === CREDENTIAL_BUSY.saving ? t("Checking…") : t("Save")}
						</Button>
					</div>
				</form>
			) : (
				<div className={classes.rowActions}>
					<Button
						variant="default"
						disabled={working}
						onClick={() => void controller.remove()}
					>
						{busy === CREDENTIAL_BUSY.removing ? t("Removing…") : t("Remove")}
					</Button>
					<Button
						variant="default"
						disabled={working}
						onClick={() => void controller.test()}
					>
						{busy === CREDENTIAL_BUSY.testing ? t("Testing…") : t("Test")}
					</Button>
				</div>
			)}
			{notice && (
				<p className={classes.inlineNote} data-tone={notice.tone} role="status">
					{notice.message}
				</p>
			)}
		</>
	);
};
