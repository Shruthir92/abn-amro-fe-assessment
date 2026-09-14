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
    <RouterLink to="/" class="back-link">
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
        class="show-details__image"
      />

      <div class="show-details__info">
        <h1>{{ show.name }}</h1>

        <p class="show-details__rating">
          ⭐ {{ show.rating.average ?? 'N/A' }}
        </p>

        <p class="show-details__genres">
          {{ show.genres.join(' · ') }}
        </p>

        <div
          v-if="show.summary"
          v-html="show.summary"
          class="show-details__summary"
        />

        <dl class="show-details__metadata">
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
<style scoped>
.show-details {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}

.back-link {
  display: inline-block;
  margin-bottom: 32px;
  text-decoration: none;
  color: inherit;
}

.show-details__content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  align-items: start;
}

.show-details__image {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.show-details__info h1 {
  margin-top: 0;
  margin-bottom: 16px;
}

.show-details__rating {
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.show-details__genres {
  margin-bottom: 24px;
}

.show-details__summary {
  line-height: 1.6;
  margin-bottom: 24px;
}

.show-details__metadata {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 12px 16px;
}

.show-details__metadata dt {
  font-weight: 600;
}

.show-details__metadata dd {
  margin: 0;
}
</style>