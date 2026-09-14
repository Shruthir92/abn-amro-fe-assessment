<script setup lang="ts">
const model = defineModel<string>({
  default: '',
})
</script>

<template>
  <input
    v-model="model"
    type="search"
    placeholder="Search TV shows..."
    aria-label="Search TV shows"
  />
</template>

<style scoped>
input {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}
</style>