import { defineStore } from "pinia";
import axios from "axios";

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
        const response = await axios.get(
          `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artistName}`
        );
        this.artists = response.data.artists;
      } catch (error) {
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
