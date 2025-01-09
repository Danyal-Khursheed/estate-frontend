import { create } from "zustand";

// Create a store to manage shared image state
export const useImageStore = create((set) => ({
  selectedImages: Array(30).fill(null),
  setSelectedImages: (images) => set({ selectedImages: images }),
  updateImage: (index, image) =>
    set((state) => {
      const newImages = [...state.selectedImages];
      newImages[index] = image;
      return { selectedImages: newImages };
    }),
}));
