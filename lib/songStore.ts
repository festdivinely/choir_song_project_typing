// lib/songStore.ts
import { create } from 'zustand'
import type { SongWithSections } from '../app/types/song'

interface SongStore {
  currentSong: SongWithSections | null;
  setCurrentSong: (song: SongWithSections | null) => void;
}

export const useSongStore = create<SongStore>((set) => ({
  currentSong: null,
  setCurrentSong: (song) => set({ currentSong: song }),
}))


type LoadingState = {
  isPageLoading: boolean | null;
  setPageLoading: (value: boolean | null) => void;
};

export const useLoadingStore = create<LoadingState>((set) => ({
  isPageLoading: null,
  setPageLoading: (value) => set({ isPageLoading: value }),
}));


interface SelectionStore {
  selectedSongIds: string[];
  getSelectedSongs: () => string[];
  count: number;
  addSong: (id: string) => void;
  removeSong: (id: string) => void;
  resetSelection: () => void;
}

export const useSelectionStore = create<SelectionStore>((set, get) => ({ // Add get here
  selectedSongIds: [],
  count: 0,

  getSelectedSongs: () => {
    return get().selectedSongIds; // Now get is defined
  },

  addSong: (id) =>
    set((state) => {
      if (state.selectedSongIds.includes(id)) return state;
      const updated = [...state.selectedSongIds, id];
      return { selectedSongIds: updated, count: updated.length };
    }),
  removeSong: (id) =>
    set((state) => {
      const updated = state.selectedSongIds.filter((songId) => songId !== id);
      return { selectedSongIds: updated, count: updated.length };
    }),
  resetSelection: () => set({ selectedSongIds: [], count: 0 }),
}));