import { create } from 'zustand';
import { useLivePreview_interface } from '@/interfaces';

export const useLivePreview = create<useLivePreview_interface>((set) => ({
  loadingLivePreview: false,
  setLoadingLivePreview: (data) => set({ loadingLivePreview: data }),
}));

export default useLivePreview;