<template>
  <div class="flex flex-col relative h-full">
    <div class="flex justify-end gap-2 mb-4">
      <div class="flex relative">
        <input class=" border border-gray-700 px-4 rounded-md" v-model="artistName" @keyup.enter="searchArtist"
          placeholder="Enter artist name" @mouseover="showTooltip = true" @mouseleave="showTooltip = false" />
        <div v-if="showTooltip"
          class="absolute  -top-4 bg-gray-700 text-white text-sm rounded p-1 z-10  left-[-200px] right-[215px]">
          Please enter 'coldplay'. Only this word is accepted.
        </div>

      </div>
      <button class="border border-gray-700" @click="searchArtist">Search</button>
      <button class="border border-gray-700" @click="cleanArtist">Clean</button>
    </div>

    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" v-if="isLoading">
      Loading...
    </div>

    <table class="w-full border-collapse" v-if="!isLoading && artists.length > 0">
      <thead>
        <tr>
          <th>Thumb</th>
          <th>Name</th>
          <th>Label</th>
          <th>Style</th>
          <th>Genre</th>
          <th>Gender</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="artist in artists" :key="artist.idArtist" @click="goToAlbumList(artist.idArtist ?? '')"
          class="cursor-pointer hover:bg-gray-100/50">
          <td>
            <div class="flex justify-center">
              <img class="w-[50px] h-auto" :src="artist.strArtistThumb" alt="Artist Thumbnail"
                v-if="artist.strArtistThumb" />
            </div>
          </td>
          <td>{{ artist.strArtist }}</td>
          <td>{{ artist.strLabel }}</td>
          <td>{{ artist.strStyle }}</td>
          <td>{{ artist.strGenre }}</td>
          <td>{{ artist.strGender }}</td>
          <td>{{ artist.strCountry }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useArtistStore } from '@/stores';
import { useRouter } from 'vue-router';

const router = useRouter();
const artistStore = useArtistStore();

const artistName = ref('');
const showTooltip = ref(false);

const searchArtist = async () => {
  if (artistName.value.trim()) {
    await artistStore.fetchArtists(artistName.value.trim());
  }
};

const cleanArtist = () => {
  artistStore.clear();
}

const goToAlbumList = (artistId: string) => {
  if (artistId === '') {
    return
  }
  router.push(`/albumlist/${artistId}`);
};

const isLoading = computed(() => artistStore.isLoading);
const artists = computed(() => artistStore.artists);
</script>
