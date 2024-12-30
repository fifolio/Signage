import { create } from 'zustand';
import { useIsSaving_interface } from '@/interfaces';

export const useIsSaving = create<useIsSaving_interface>((set) => ({
    isSaving: false,
    setIsSaving: (state) => set({ isSaving: state }),
}));

export default useIsSaving;