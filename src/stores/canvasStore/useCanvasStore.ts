import { create } from 'zustand';

interface CanvasStore_interface {
    jsonData: string;
    setJsonData: (data: string) => void;
  }

  export const useCanvasStore = create<CanvasStore_interface>((set) => ({
    jsonData: '',
    setJsonData: (data) => set({ jsonData: data }),
  }));

export default useCanvasStore;