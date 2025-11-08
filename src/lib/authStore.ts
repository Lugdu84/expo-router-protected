import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
	isLoggedIn: boolean;
	isAdmin: boolean;
	_hasHydrated: boolean;
	logIn: () => void;
	logOut: () => void;
	setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create(
	persist<UserState>(
		(set) => ({
			isLoggedIn: false,
			isAdmin: false,
			_hasHydrated: false,
			logIn: () =>
				set((state) => ({
					...state,
					isLoggedIn: true,
					isAdmin: false,
				})),
			logOut: () =>
				set((state) => ({
					...state,
					isLoggedIn: false,
					isAdmin: false,
				})),
			setHasHydrated: (value: boolean) =>
				set((state) => ({
					...state,
					_hasHydrated: value,
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
