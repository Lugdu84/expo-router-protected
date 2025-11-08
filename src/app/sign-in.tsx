import { useMemo, useState } from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@lib/authStore';
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native';

export default function SignInScreen() {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const logIn = useAuthStore((state) => state.logIn);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const colorScheme = useColorScheme();
	const isDark = colorScheme === 'dark';
	const styles = useMemo(() => createStyles(isDark), [isDark]);
	const placeholderColor = isDark ? '#6b7280' : '#9ca3af';

	if (isLoggedIn) {
		return <Redirect href="/(tabs)" />;
	}

	const handleEmailLogin = () => {
		if (!email.trim() || !password.trim()) {
			Alert.alert('Formulaire incomplet', 'Veuillez saisir email et mot de passe.');
			return;
		}
		logIn();
	};

	const handleAppleLogin = () => {
		// Remplacez par l'intégration Apple réelle.
		logIn();
	};

	const handleGoogleLogin = () => {
		// Remplacez par l'intégration Google réelle.
		logIn();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Connexion</Text>
			<View style={styles.form}>
				<TextInput
					value={email}
					onChangeText={setEmail}
					placeholder="Email"
					keyboardType="email-address"
					autoCapitalize="none"
					placeholderTextColor={placeholderColor}
					style={styles.input}
				/>
				<TextInput
					value={password}
					onChangeText={setPassword}
					placeholder="Mot de passe"
					secureTextEntry
					placeholderTextColor={placeholderColor}
					style={styles.input}
				/>
				<TouchableOpacity
					style={styles.primaryButton}
					onPress={handleEmailLogin}
				>
					<Text style={styles.primaryButtonText}>Se connecter</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.divider}>
				<View style={styles.dividerLine} />
				<Text style={styles.dividerText}>ou</Text>
				<View style={styles.dividerLine} />
			</View>

			<View style={styles.socialButtons}>
				<TouchableOpacity
					style={styles.socialButton}
					onPress={handleAppleLogin}
				>
					<Text style={styles.socialButtonText}>Continuer avec Apple</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.socialButton}
					onPress={handleGoogleLogin}
				>
					<Text style={styles.socialButtonText}>Continuer avec Google</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const createStyles = (isDark: boolean) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'stretch',
			paddingHorizontal: 24,
			paddingVertical: 32,
			backgroundColor: isDark ? '#111827' : '#f9fafb',
		},
		title: {
			fontSize: 28,
			fontWeight: '600',
			color: isDark ? '#f9fafb' : '#111827',
			textAlign: 'center',
			marginBottom: 32,
		},
		form: {
			marginBottom: 24,
		},
		input: {
			height: 52,
			paddingHorizontal: 16,
			borderRadius: 12,
			backgroundColor: isDark ? '#1f2937' : '#ffffff',
			color: isDark ? '#f9fafb' : '#111827',
			borderWidth: isDark ? 0 : 1,
			borderColor: isDark ? 'transparent' : '#e5e7eb',
			marginBottom: 16,
		},
		primaryButton: {
			height: 52,
			borderRadius: 12,
			backgroundColor: '#2563eb',
			alignItems: 'center',
			justifyContent: 'center',
		},
		primaryButtonText: {
			color: '#f9fafb',
			fontSize: 16,
			fontWeight: '600',
		},
		divider: {
			marginVertical: 32,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		},
		dividerLine: {
			flex: 1,
			height: 1,
			backgroundColor: isDark ? '#374151' : '#e5e7eb',
			marginHorizontal: 12,
		},
		dividerText: {
			color: isDark ? '#9ca3af' : '#6b7280',
		},
		socialButtons: {
			marginTop: 8,
		},
		socialButton: {
			height: 52,
			borderRadius: 12,
			backgroundColor: isDark ? '#1f2937' : '#ffffff',
			borderWidth: 1,
			borderColor: isDark ? '#374151' : '#d1d5db',
			alignItems: 'center',
			justifyContent: 'center',
			marginBottom: 16,
		},
		socialButtonText: {
			color: isDark ? '#f9fafb' : '#111827',
			fontSize: 16,
			fontWeight: '500',
		},
	});
