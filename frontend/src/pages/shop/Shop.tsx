import './Shop.css'
import { useGames } from '../../queries/games/useGames';
import GameList, { } from '../../components/game/GameList';
import Filters from '@/components/filters/Filters';
import { useFilters } from '@/context/filterContext';
import Search from '@/components/search/Search';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { SearchXIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Loading from '@/components/ui/loading';
import { Spinner } from '@/components/ui/spinner';

export default function Shop() {

  const { filters, resetFilters } = useFilters();
  const { isLoading, isError, error, isFetching, data: games } = useGames(filters);




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
          <Filters />
          <Search />
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

    return (
      <>
        <div className="shop-content">
          {games != null && games.length > 0
            ? <GameList games={games} />
            : noGames()
          }
        </div>

        {
          isFetching && (
            <div className="flex justify-center py-4">
              <div className="flex items-center gap-2">
                <Spinner className="h-4 w-4 text-blue-500" />
                <span className="text-gray-400 text-sm">Cargando mas...</span>
              </div>
            </div>
          )
        }
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
}

