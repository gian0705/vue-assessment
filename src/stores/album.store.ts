import { defineStore } from "pinia";
import axios from "axios";

export type AlbumState = {
  isLoading: boolean;
  albums: Array<IAlbum>;
};

export const useAlbumStore = defineStore({
  id: "Album",
  state: () =>
    ({
      isLoading: false,
      albums: [],
    } as AlbumState),
  actions: {
    async fetchAlbums(artistName: string) {
      this.isLoading = true;

      try {
        // daft_punk
        const response = await axios.get(
          `https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?s=${artistName}`
        );
        this.albums = response.data.album;
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },
    clear() {
      this.isLoading = false;
      this.albums = [];
    },
  },
});
