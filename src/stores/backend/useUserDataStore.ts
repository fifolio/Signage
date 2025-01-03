import { create } from 'zustand';

interface UserData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface useUserDataStore_interface {
    userData: UserData | null;
    setUserData: (state: UserData) => void;
}

export const useUserDataStore = create<useUserDataStore_interface>((set) => ({
    userData: null, // Initialize as null
    setUserData: (state) => set({ userData: state }),
}));

export const getUserData = useUserDataStore.getState().userData;
export const setUserData = useUserDataStore.getState().setUserData;
export default useUserDataStore;
