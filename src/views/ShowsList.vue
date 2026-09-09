<script setup lang="ts">
import { onMounted } from 'vue'
import { useShows } from '../composables/useShows'

const { fetchShows, shows, isLoading, error } = useShows()

onMounted(() => {
  fetchShows()
})
</script>
<template>
  <div v-if="isLoading">Loading TV Shows...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>{{ shows.length }} shows loaded</div>
</template>