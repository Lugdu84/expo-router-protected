import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import { useColorScheme } from '@/src/components/useColorScheme';
import Colors from '@/src/constants/Colors';
import { useAuthStore } from '@lib/authStore';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return (
		<FontAwesome
			size={28}
			style={{ marginBottom: -3 }}
			{...props}
		/>
	);
}

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { isLoggedIn, isAdmin, logOut } = useAuthStore();

	// if (!isLoggedIn) {
	// 	return <Redirect href="/sign-in" />;
	// }

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: useClientOnlyValue(false, true),
				headerRight: () => (
					<Pressable
						onPress={logOut}
						style={({ pressed }) => ({
							opacity: pressed ? 0.5 : 1,
							right: 15,
						})}>
						<FontAwesome
							name="sign-out"
							size={25}
							color={Colors[colorScheme ?? 'light'].text}
						/>
					</Pressable>
				),
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							name="user"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Protected guard={isAdmin}>
				<Tabs.Screen
					name="admin"
					options={{
						// href: isAdmin ? '/(tabs)/admin' : null,
						title: 'Admin',
						tabBarIcon: ({ color }) => (
							<TabBarIcon
								name="code"
								color={color}
							/>
						),
					}}
				/>
			</Tabs.Protected>
		</Tabs>
	);
}
