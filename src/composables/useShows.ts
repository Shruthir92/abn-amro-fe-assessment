import { ref } from 'vue'
import { getShows } from '../api/tvmaze'
import type { Show } from '../types/show'

export function useShows() {
  const shows = ref<Show[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchShows() {
    try {
      isLoading.value = true
      error.value = null
      shows.value = await getShows()
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Something went wrong while fetching shows.'
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    shows,
    isLoading,
    error,
    fetchShows,
  }
}