import './Shop.css'
import { useGames } from '../../queries/games/useGames';
import GameList, { } from '../../components/game/GameList';
import Filters from '@/components/filters/Filters';
import Search from '@/components/search/Search';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { SearchXIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import { useDebounce } from '@/components/debounced/debounced';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useEffect, useState } from 'react';
import type { Filter } from '@/types/filter';

const gamesPerPage = 12;

function defaultFilters() {
  return {
    // developer: "",
    minPrecio: 0,
    maxPrecio: undefined,
    categorias: [],
    search: "",
    sort: { field: "", asc: true }
  }
}
let initialLoad = true;

function initialFilters() {
  if (localStorage.getItem("filters")) {
    return JSON.parse(localStorage.getItem("filters")!)
  }
  return defaultFilters();
}

export default function Shop() {
  const [filters, setFilters] = useState<Filter>(initialFilters());

  const debouncedFilters = useDebounce(filters, 300);
  const [page, setPage] = useState(parseInt(localStorage.getItem('page') || "1"));

  useEffect(() => {
    // if( JSON.stringify(debouncedFilters) ==  JSON.stringify(initialFilters()) && parseInt(localStorage.getItem('page')!) == page ) return
    if (initialLoad) {
      initialLoad = false;
      return;
    }
    localStorage.setItem('filters', JSON.stringify(filters));
    setPage(1);
    console.log("DEBOUNCE ", debouncedFilters, initialFilters());

  }, [debouncedFilters]);

  useEffect(() => {
    localStorage.setItem('page', page.toString());
  }, [page]);

  const { isLoading, isError, error, data } = useGames(debouncedFilters, page || 1, gamesPerPage);

  return (
    <div className="shop-container">
      {shopHeader()}
      {shopBody()}

    </div>
  )



  function shopHeader() {
    return (
      <div className="shop-header">
        <h1 className="text-3xl font-bold text-white mb-6">Tienda</h1>
        <div className="flex items-center gap-4 w-full max-w-2xl mx-auto max-w-lg">
          <Filters filters={filters} setFilters={setFilters} resetFilters={resetFilters} />
          <Search filters={filters} setFilters={setFilters} />
        </div>
      </div>
    )
  }
  function shopBody() {

    if (isLoading) return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loading />
      </div>
    )

    if (isError) {
      console.log("Error ", error);
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-red-400">Ha ocurrido un error al cargar los juegos</p>
        </div>
      )
    }
    const { games, total } = data!;

    return (
      <>
        <div className="shop-content">
          {games != null && games.length > 0
            ? <GameList games={games} />
            : noGames()
          }
        </div>
        {pagination(total || 0)}
      </>
    )

  }

  function noGames() {
    return (
      <Empty className="border-2 border-dashed border-gray-700 bg-gray-800/50 rounded-lg p-12">
        <EmptyContent className="flex flex-col items-center">
          <div className="mb-4 p-4 bg-gray-700/50 rounded-full">
            <SearchXIcon className="h-10 w-10 " />
          </div>
          <EmptyHeader className="text-center space-y-2">
            <EmptyTitle className="text-2xl font-bold text-white">
              No se han encontrado juegos
            </EmptyTitle>
            <EmptyDescription className="text-gray-400 max-w-md">
              No hay juegos que coincidan con los filtros seleccionados.
              Prueba ajustando tus criterios de búsqueda.
            </EmptyDescription>
          </EmptyHeader>
          <Button
            variant="outline"
            className="mt-6 bg-gray-800 border-gray-700 hover:bg-gray-700"
            onClick={() => resetFilters?.()}
          >
            Limpiar filtros
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  function pagination(total: number) {

    const totalPages: number = Math.ceil(total / gamesPerPage) || 1
    if (totalPages <= 1) return <></>

    const pages = []
    const nextPage = () => {
      if (page >= totalPages) return page
      return page + 1
    }
    const previousPage = () => {
      if (page <= 1) return page
      return page - 1
    }
    for (let i = 1; i <= totalPages; i++) pages.push(i)

    return (
      <Pagination className='pagination'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(previousPage())} />
          </PaginationItem>
          {
            pages.map((pagenum) => (
              <PaginationItem key={pagenum}>
                <PaginationLink isActive={page === pagenum} onClick={() => setPage(pagenum)}>{pagenum}</PaginationLink>
              </PaginationItem>
            ))
          }
          <PaginationItem>
            <PaginationNext onClick={() => setPage(nextPage())} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  function resetFilters() {
    localStorage.removeItem("filters");
    setFilters(defaultFilters());
  }
}

