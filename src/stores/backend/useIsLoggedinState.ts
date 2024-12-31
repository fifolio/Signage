import { create } from 'zustand';
import { useIsUserLoggedInState_interface } from '@/interfaces';

export const useIsUserLoggedInState = create<useIsUserLoggedInState_interface>((set) => ({
    isUserLoggedIn: false,
    setIsUserLoggedIn: (data) => set({ isUserLoggedIn: data }),
}));


export default useIsUserLoggedInState;