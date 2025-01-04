import { create } from 'zustand';
import { useFileName_interface } from '@/interfaces';

const useFileName = create<useFileName_interface>((set) => ({

    // Current file name
    currentFileName: '',
    setCurrentFileName: (state) => set({ currentFileName: state }),

    // New file name
    newFileName: '',
    setNewFileName: (state) => set({ newFileName: state }),
}))

export default useFileName;