import type { Show } from '../types/show'

const BASE_URL = 'https://api.tvmaze.com'

export async function getShows(): Promise<Show[]> {
  const response = await fetch(`${BASE_URL}/shows`)

  if (!response.ok) {
    throw new Error(`Failed to fetch shows: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getShowById(id: number): Promise<Show> {
  const response = await fetch(`${BASE_URL}/shows/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch TV show')
  }

  return response.json()
}