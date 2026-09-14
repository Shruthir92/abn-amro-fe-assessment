import { ref } from 'vue'
import { searchShows } from '../api/tvmaze'
import type { Show } from '../types/show'

export function useSearch() {
  const results = ref<Show[]>([])
  const isSearching = ref(false)
  const error = ref<string | null>(null)

  async function search(query: string) {
    if (!query.trim()) {
      results.value = []
      return
    }

    try {
      isSearching.value = true
      error.value = null

      const response = await searchShows(query)

      results.value = response.map(
        (result) => result.show,
      )
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : 'Search failed'
    } finally {
      isSearching.value = false
    }
  }

  return {
    results,
    isSearching,
    error,
    search,
  }
}