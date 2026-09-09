<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useShows } from '../composables/useShows'
import { groupShowsByGenre} from '../utils/index'
import ShowGenre from '../components/showGenre.vue'

const { fetchShows, shows, isLoading, error } = useShows()

const showsByGenre = computed(() =>
  groupShowsByGenre(shows.value)
)

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