<script setup lang="ts">
import type { Show } from '../types/show'
import noImage from '../assets/no-image.png'

defineProps<{
  show: Show
}>()
</script>
<template>
  <article>
    <img
      v-if="show.image?.medium"
      :src="show.image.medium"
      :alt="show.name"
    />
    <div v-else>
      <img :src="noImage" alt="No image available" />
    </div>
    <div class="show-card">
      <h3>{{ show.name }}</h3>
      <p>⭐ {{ show.rating.average ?? 'N/A' }}</p>
    </div>
  </article>
</template>
<style scoped>
.show-card {
  text-decoration: none;
  color: inherit;
}
</style>