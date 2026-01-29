export interface Game {
  id?: number
  slug: string
  nom: string
  descripcion: string
  categorias: string[]
  precio: number
  images: string[]
  developer: string
  rating?: number
  num_reviews?: number,
  owned?:boolean
}
