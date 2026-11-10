import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { FluentLibraryFilled } from "@/components/icons/FluentLibraryFilled";
import { Button, TextInput } from "@/components/ui";
import styles from "./SignInForm.module.css";

export interface SignInFormProps {
	onSubmit: (username: string, password: string) => void;
	pending: boolean;
	error: string | null;
}

export const SignInForm = ({ onSubmit, pending, error }: SignInFormProps) => {
	const { t } = useTranslation();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(username, password);
	};
	return (
		<main className={styles.root}>
			<form className={styles.card} onSubmit={submit} aria-busy={pending}>
				<div className={styles.mark} aria-hidden="true">
					<FluentLibraryFilled fontSize={28} />
				</div>
				<h1 className={styles.title}>{t("Sign in to Citadel")}</h1>
				<TextInput
					label={t("Username")}
					name="username"
					autoComplete="username"
					autoCapitalize="none"
					spellCheck={false}
					required
					value={username}
					onChange={(event) => setUsername(event.currentTarget.value)}
				/>
				<TextInput
					label={t("Password")}
					name="password"
					type="password"
					autoComplete="current-password"
					required
					value={password}
					onChange={(event) => setPassword(event.currentTarget.value)}
				/>
				{error && (
					<p role="alert" className={styles.error}>
						{error}
					</p>
				)}
				<Button type="submit" variant="primary" fullWidth disabled={pending}>
					{pending ? t("Signing in…") : t("Sign In")}
				</Button>
			</form>
		</main>
	);
};
