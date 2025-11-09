import { useAuthStore } from '@lib/authStore';
import { useMemo } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native';

export default function SignInScreen() {
	const { isLoggedIn, logIn, logInAsAdmin } = useAuthStore();

	const colorScheme = useColorScheme();
	const isDark = colorScheme === 'dark';
	const styles = useMemo(() => createStyles(isDark), [isDark]);

	// if (isLoggedIn) {
	// 	return <Redirect href="/(tabs)" />;
	// }

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Connexion</Text>
			<Text style={styles.subtitle}>
				Cette vue illustre deux parcours: un accès classique et un accès
				administrateur.
			</Text>

			<View style={styles.buttons}>
				<TouchableOpacity
					style={[styles.primaryButton, styles.basicButton]}
					onPress={logIn}
					testID="basic-login-button">
					<Text style={styles.primaryButtonText}>Connexion simple</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.primaryButton, styles.adminButton]}
					onPress={logInAsAdmin}
					testID="admin-login-button">
					<Text style={styles.adminButtonText}>Connexion admin</Text>
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
			alignItems: 'center',
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
		subtitle: {
			fontSize: 16,
			textAlign: 'center',
			color: isDark ? '#9ca3af' : '#4b5563',
			marginBottom: 40,
		},
		buttons: {
			width: '100%',
		},
		basicButton: {
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
		adminButton: {
			backgroundColor: isDark ? '#1f2937' : '#ffffff',
			borderWidth: 1,
			borderColor: isDark ? '#374151' : '#d1d5db',
		},
		adminButtonText: {
			color: isDark ? '#f9fafb' : '#111827',
			fontSize: 16,
			fontWeight: '600',
		},
	});
