export interface Game {
  id?: number
  slug: string
  nom: string
  descripcion: string
  categories: string[]
  precio: number
  images: string[]
  developer: string
  rating?: number
  num_reviews?: number
  owned?: boolean
  isActive?: boolean
}
export interface GameFormData {
	nom: string
	precio: number
	descripcion: string
	categories: string[]
	images: string[]
}

