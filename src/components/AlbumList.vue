<template>
    <div class="flex flex-col relative h-full">
        <div class="flex justify-start">
            <button @click="goBack" class="flex items-center mb-4 text-blue-500">
                <i class="fa fa-arrow-left fa-lg mr-2"></i>
                Back
            </button>
        </div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" v-if="isLoading">
            Loading...
        </div>
        <table class="w-full border-collapse" v-if="!isLoading && albums.length > 0">
            <thead>
                <tr>
                    <th>Thumb</th>
                    <th>Name</th>
                    <th>Released Year</th>
                    <th>Style</th>
                    <th>Genre</th>
                    <th>Label</th>
                    <th>Release Format</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="album in albums" :key="album.idAlbum">
                    <td>
                        <div class="flex justify-center">
                            <img class="w-[50px] h-auto" :src="album.strAlbumThumb" alt="Album Thumbnail"
                                v-if="album.strAlbumThumb" />
                        </div>
                    </td>
                    <td>{{ album.strAlbum }}</td>
                    <td>{{ album.intYearReleased }}</td>
                    <td>{{ album.strStyle }}</td>
                    <td>{{ album.strGenre }}</td>
                    <td>{{ album.strLabel }}</td>
                    <td>{{ album.strReleaseFormat }}</td>

                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAlbumStore, useArtistStore } from '@/stores';
import { useRoute, useRouter } from 'vue-router';
import 'font-awesome/css/font-awesome.css';

const route = useRoute();
const router = useRouter();
const albumStore = useAlbumStore();
const artistStore = useArtistStore();

const fetchAlbums = async (artistName: string) => {
    await albumStore.fetchAlbums(artistName);
}

const isLoading = computed(() => albumStore.isLoading);
const albums = computed(() => albumStore.albums);

onMounted(() => {
    const artistId = route.params.artistId as string

    const artist = artistStore.artists.find(artist => artist.idArtist === artistId)
    if (artist) {
        fetchAlbums((artist.strArtist ?? '').toLowerCase())
    }
})

const goBack = () => {
    // Navigate to the previous page
    router.go(-1);
};
</script>