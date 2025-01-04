import { create } from 'zustand';

interface file_Object_interface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface useFileDetails_interface {
    fileDetails: file_Object_interface | null;
    setFileDetails: (state: file_Object_interface) => void;
}

export const useFileDetails = create<useFileDetails_interface>((set) => ({
    fileDetails: null, // Initialize as null
    setFileDetails: (state) => set({ fileDetails: state }),
}));

export default useFileDetails;
