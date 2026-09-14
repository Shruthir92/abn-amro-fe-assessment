import type { Show, ShowsByGenre } from '../types/show'

export function groupShowsByGenre(shows: Show[]): ShowsByGenre {
  const groupedShows: ShowsByGenre = shows.reduce<ShowsByGenre>((genreMap, show) => {
    show.genres.forEach((genre) => {
        if (!genreMap[genre]) {
          genreMap[genre] = []
        }

        genreMap[genre].push(show)
      })

      return genreMap
  }, {})

  Object.values(groupedShows).forEach((shows) => {
    shows.sort((a, b) => {
      const ratingA = a.rating.average ?? 0
      const ratingB = b.rating.average ?? 0

      return ratingB - ratingA
    })
  })

  return groupedShows
}

export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay = 300,
) {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}