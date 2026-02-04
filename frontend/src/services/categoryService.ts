import { apiAuth } from './api'
import type { Categoria } from '@/types/categoria'

export async function getCategories(): Promise<Categoria[]> {
  const res = await apiAuth.get('categoria')
  return res.data
}

export async function getCategory(slug: string): Promise<Categoria> {
  const res = await apiAuth.get(`categoria/${slug}`)
  return res.data
}

export async function createCategory(data: {nom:string}): Promise<Categoria> {
  const res = await apiAuth.post('categoria', { categoria: data })
  return res.data
}

export async function updateCategory(slug: string, data: {nom:string}): Promise<Categoria> {
  const res = await apiAuth.put(`categoria/${slug}`, { categoria: data })
  return res.data
}

export async function deleteCategory(slug: string): Promise<void> {
  await apiAuth.delete(`categoria/${slug}`)
}

export async function activateCategory(slug: string): Promise<void> {
  await apiAuth.put(`categoria/activate/${slug}`)
}
