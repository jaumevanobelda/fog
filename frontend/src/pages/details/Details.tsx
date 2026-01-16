import { useGame } from '../../queries/games/useGame';
import { useParams } from 'react-router-dom';
import { GameImageCarousel } from '../../components/game/GameImageCarousel';
import { Button } from '@/components/ui/button';

export default function Details() {

  const { isLoading, isError, error, data: game, } = useGame(useParams().slug!);

  if (isLoading) return <p> Cargando...</p>

  if (isError) {
    console.log("Error ", error);

    return <p>Error</p>
  }
  if (!!game === false) {
    return <p>No se ha encontrado el juego</p>
  }

  console.log("GAME ", game);


  return (
    <>
      <div className='flex gap-8 max-w-6xl mx-auto p-4'>
        <div className='flex-1'>
          <GameImageCarousel images={game.images} />
        </div>
        <div className='flex-1 space-y-4'>
          <h1 className='text-4xl font-bold'>{game.nom}</h1>
          <h3 className='text-lg text-gray-400'>{game.descripcion}</h3>
          <div>
            <h2 className='text-yellow-500 font-semibold'>
              {game.num_reviews! >= 1 ?
                `${game.rating}% de ${game.num_reviews} son positivas`
                : "No hay reseñas"
              }
            </h2>
          </div>
          <div>
            <h1 className='text-2xl font-bold mb-2'>Categorias:</h1>
            <div className='flex flex-wrap gap-2'>
              {/* las categorias en la misma linea */}
              {game.categorias.map((categoria: string) => {
                return (
                  <div key={categoria} className='bg-gray-700 px-3 py-1 rounded'>
                    <h1 className='text-sm'>{categoria}</h1>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <h1 className='text-lg'>{game.developer}</h1>
          </div>

          <div className='flex items-center gap-4 pt-4'>
            <h2 className='text-3xl font-bold'>{game.precio}€</h2>
            {/* MISMA LINEA */}
            <Button variant="outline">Añadir al carrito</Button>
          </div>

        </div>
      </div>
    </>
  )



}

