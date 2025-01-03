import { create } from 'zustand';
import { useLoadingScreen_interface } from '@/interfaces';

export const useLoadingScreen = create<useLoadingScreen_interface>((set) => ({
    loadingScreen: false,
    setLoadingScreen: (state) => set({ loadingScreen: state }),
}));

export default useLoadingScreen;