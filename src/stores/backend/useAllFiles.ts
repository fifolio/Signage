import { create } from 'zustand';

interface allFiles_Object_interface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface useAllFiles_interface {
    allFiles: allFiles_Object_interface | null;
    setAllFiles: (state: allFiles_Object_interface) => void;
}

export const useAllFiles = create<useAllFiles_interface>((set) => ({
    allFiles: null, // Initialize as null
    setAllFiles: (state) => set({ allFiles: state }),
}));

export const getAllFiles = useAllFiles.getState().allFiles;
export const setAllFiles = useAllFiles.getState().setAllFiles;
export default useAllFiles;
