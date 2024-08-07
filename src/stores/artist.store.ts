import { defineStore } from "pinia";
import axiosInstance from "@/api/axiosConfig";

export type ArtistState = {
  isLoading: boolean;
  artists: Array<IArtist>;
};

export const useArtistStore = defineStore({
  id: "Artist",
  state: () =>
    ({
      isLoading: false,
      artists: [],
    } as ArtistState),
  actions: {
    async fetchArtists(artistName: string) {
      this.isLoading = true;
      try {
        const response = await axiosInstance.get(`/search.php?s=${artistName}`);
        this.artists = response.data.artists;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    clear() {
      this.isLoading = false;
      this.artists = [];
    },
  },
  persist: true,
});
