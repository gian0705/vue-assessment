import { defineStore } from "pinia";
import axiosInstance from "@/api/axiosConfig";

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
        const response = await axiosInstance.get(
          `/searchalbum.php?s=${artistName}`
        );
        this.albums = response.data.album;
      } catch (error) {
        console.log(error);
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
