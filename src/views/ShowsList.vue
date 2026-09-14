<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { useShows } from '../composables/useShows'
import { useSearch } from '../composables/useSearch'
import { groupShowsByGenre, debounce} from '../utils/index'
import ShowGenre from '../components/ShowGenre.vue'
import SearchBar from '../components/SearchBar.vue'
import ShowCard from '../components/ShowCard.vue'

const searchQuery = ref('')

const { 
  fetchShows,
  shows, 
  isLoading,
  error 
} = useShows()

const {
  results,
  isSearching,
  search,
} = useSearch()

const showsByGenre = computed(() =>
  groupShowsByGenre(shows.value)
)

const debouncedSearch = debounce(
  (query: string) => {
    search(query)
  },
  300,
)

watch(searchQuery, (query) => {
  debouncedSearch(query)
})

onMounted(() => {
  fetchShows()
})

</script>
<template>
  <main class="home">
    <header class="home__header">
      <h1>TV Shows</h1>
    </header>

    <p v-if="isLoading">Loading shows...</p>
    <p v-else-if="error">{{ error }}</p>

    <SearchBar v-model="searchQuery" />

    <div v-if="searchQuery">
      <p v-if="isSearching">
        Searching...
      </p>

      <div
        v-else
        class="search-results"
      >
        <ShowCard
          v-for="show in results"
          :key="show.id"
          :show="show"
        />
      </div>
    </div>

    <div v-else>
      <ShowGenre
        v-for="(genreShows, genre) in showsByGenre"
        :key="genre"
        :genre="genre"
        :shows="genreShows"
      />
    </div>
  </main>
</template>
<style scoped>
.home {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

.home__header {
  margin-bottom: 32px;
}
</style>