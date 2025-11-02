import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
	isLoggedIn: boolean;
	logIn: () => void;
	logOut: () => void;
};

export const useAuthStore = create(
	persist<UserState>(
		(set) => ({
			isLoggedIn: false,
			logIn: () => set((state) => ({ ...state, isLoggedIn: true })),
			logOut: () => set((state) => ({ ...state, isLoggedIn: false })),
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
