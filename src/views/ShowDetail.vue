<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getShowById } from '../api/tvmaze'
import type { Show } from '../types/show'

const route = useRoute()

const show = ref<Show | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

async function fetchShow() {
  try {
    isLoading.value = true
    error.value = null

    const showId = Number(route.params.id)

    show.value = await getShowById(showId)
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : 'Something went wrong'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchShow()
})
</script>

<template>
  <main class="show-details">
    <RouterLink to="/">
      ← Back to shows
    </RouterLink>

    <p v-if="isLoading">
      Loading show...
    </p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <article
      v-else-if="show"
      class="show-details__content"
    >
      <img
        v-if="show.image?.original"
        :src="show.image.original"
        :alt="show.name"
      />

      <div>
        <h1>{{ show.name }}</h1>

        <p>
          ⭐ {{ show.rating.average ?? 'N/A' }}
        </p>

        <p>
          {{ show.genres.join(' · ') }}
        </p>

        <div
          v-if="show.summary"
          v-html="show.summary"
        />

        <dl>
          <dt>Status</dt>
          <dd>{{ show.status }}</dd>

          <dt>Language</dt>
          <dd>{{ show.language }}</dd>

          <dt>Premiered</dt>
          <dd>{{ show.premiered ?? 'N/A' }}</dd>
        </dl>
      </div>
    </article>
  </main>
</template>