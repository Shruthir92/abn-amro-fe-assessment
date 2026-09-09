<script setup lang="ts">
import ShowCard from '../components/showCard.vue'
import type { Show } from '../types/show.ts'

defineProps<{
  genre: string
  shows: Show[]
}>()
</script>

<template>
  <section class="genre-section">
    <h2>{{ genre }}</h2>

    <div class="genre-section__shows">
      <ShowCard
        v-for="show in shows"
        :key="show.id"
        :show="show"
      />
    </div>
  </section>
</template>

<style scoped>
.genre-section {
  margin-bottom: 32px;
}

.genre-section h2 {
  margin-bottom: 16px;
}

.genre-section__shows {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
}
</style>