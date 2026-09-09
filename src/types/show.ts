export interface ShowImage {
  medium: string | null
  original: string | null
}

export interface ShowRating {
  average: number | null
}

export interface Show {
  id: number
  name: string
  genres: string[]
  rating: ShowRating
  image: ShowImage | null
  summary: string | null
  premiered: string | null
  ended: string | null
  status: string
  language: string
}

export interface ShowsByGenre {
  [genre: string]: Show[]
}