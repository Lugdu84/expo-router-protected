import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
	isLoggedIn: boolean;
	isAdmin: boolean;
	logIn: () => void;
	logOut: () => void;
};

export const useAuthStore = create(
	persist<UserState>(
		(set) => ({
			isLoggedIn: false,
			isAdmin: false,
			logIn: () =>
				set((state) => ({
					...state,
					isLoggedIn: true,
					isAdmin: true,
				})),
			logOut: () =>
				set((state) => ({
					...state,
					isLoggedIn: false,
					isAdmin: false,
				})),
		}),
		{
			name: 'auth-store',
			storage: createJSONStorage(() => ({
				setItem,
				getItem,
				removeItem: deleteItemAsync,
			})),
		}
	)
);
