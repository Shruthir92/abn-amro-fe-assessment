<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Show } from '../types/show'
import noImage from '../assets/no-image.png'

defineProps<{
  show: Show
}>()
</script>
<template>
  <RouterLink
    :to="`/shows/${show.id}`"
    class="show-card"
  >
    <img
      v-if="show.image?.medium"
      :src="show.image.medium"
      :alt="show.name"
    />
    <div v-else>
      <img :src="noImage" alt="No image available" />
    </div>
    <div class="show-card__content">
      <h3>{{ show.name }}</h3>
      <p>⭐ {{ show.rating.average ?? 'N/A' }}</p>
    </div>
  </RouterLink>
</template>
<style scoped>
.show-card {
  width: 160px;
  flex-shrink: 0;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.show-card img {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 8px;
}

.show-card__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
  background: #eee;
}

.show-card__content {
  padding-top: 8px;
}

.show-card h3 {
  margin: 0;
  font-size: 1rem;
}

.show-card p {
  margin: 4px 0 0;
}
</style>