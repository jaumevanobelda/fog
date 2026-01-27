import type { Filter } from '@/types/filter';
import { apiClientServer } from './api'


export async function getGames(filters: Filter) {
  // console.log("GET GAMES ", filters);

  // const params = new URLSearchParams();

  // if (filters.minPrecio !== undefined && filters.minPrecio > 0) {
  //   params.append('minPrecio', filters.minPrecio.toString());
  // }

  // if (filters.maxPrecio !== undefined) {
  //   params.append('maxPrecio', filters.maxPrecio.toString());
  // }

  // if (filters.categorias && filters.categorias.length > 0) {
  //   params.append('categorias', filters.categorias.join(','));
  // }

  // if (filters.search && filters.search.trim() !== '') {
  //   params.append('search', filters.search.trim());
  // }

  // if (filters.sort && filters.sort.field && filters.sort.field.trim() !== '') {
  //   params.append('sortField', filters.sort.field);
  //   params.append('sortAsc', filters.sort.asc.toString());
  // }
  // const queryString = params.toString();
  // console.log("params ",params.toString());
  // console.log(" TEST ", JSON.stringify(filters));
  // const url = queryString ? `games?${queryString}&test=${JSON.stringify(filters)}` : 'games';
  const url = `games?filters=${JSON.stringify(filters)}`;
  const res = await apiClientServer.get(url);
  return await res.data;
}

export async function getGame(slug: string) {
  const res = await apiClientServer.get(`games/${slug}`);
  return await res.data;
}

export async function getCategorias() {
  const res = await apiClientServer.get(`games/categorias`);
  return res.data;
}

export async function getMaxPrecio() {
  const res = await apiClientServer.get(`games/maxPrecio`);
  return res.data.maxPrecio;
}

export async function getGameById(id: number) {
  const res = await apiClientServer.get(`games/id/${id}`);
  return await res.data;
}


