import { useGame } from '../../queries/games/useGame';
import { useParams, useNavigate } from 'react-router-dom';
import { GameImageCarousel } from '../../components/game/GameImageCarousel';
import { Button } from '@/components/ui/button';
import { useAddToCart } from '@/mutations/cart/useCart';
import { toast } from 'sonner';
import Reviews from '@/components/reviews/Reviews';
import { useGetCart } from '@/queries/cart/useCart';
import Loading from '@/components/ui/loading';

export default function Details() {

  const { isLoading, isError, error, data: game, } = useGame(useParams().slug!);
  const cart = useGetCart().data?.cart;
  const { mutateAsync } = useAddToCart();
  const navigate = useNavigate();

  if (isLoading) return <Loading/>

  if (isError) {
    console.log("Error ", error);

    return <p>Error</p>
  }
  if (!!game === false) {
    return <p>No se ha encontrado el juego</p>
  }

  // console.log("GAME ", game);


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
            <h2 className={`text-${ratingColor()}-500 font-semibold`}>
              {game.num_reviews! >= 1 ?
                `${game.rating}% de ${game.num_reviews} reseña${(game.num_reviews! > 1) ? "s" : ""} son positivas`
                : "No hay reseñas"
              }
            </h2>
          </div>
          <div>
            <h1 className='text-2xl font-bold mb-2'>Categorias:</h1>
            <div className='flex flex-wrap gap-2'>
              {game.categories.map((categoria: string) => {
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
            {game.owned
              ? <div className='bg-blue-600 px-3 py-1 rounded'>Juego Comprado</div>
              : cart.includes(game.id)
                ? <div className='bg-blue-600 px-3 py-1 rounded'>Juego añadido al carrito</div>
                : <Button variant="outline" onClick={addToCart}>Añadir al carrito</Button>
            }
          </div>

        </div>

      </div><Reviews slug={game.slug} />
    </>
  )

  function ratingColor() {
    if (game!.num_reviews === 0) return "yellow";
    if (game!.rating! > 75) return "blue";
    if (game!.rating! < 50) return "red";
    return "yellow";
  }

  async function addToCart() {
    try {
      let data = await mutateAsync(game!.id!);
      console.log("data ", await data);
      toast.success("Juego añadidido al carrito");

    } catch (error: any) {
      console.log("Error add to cart ", error);
      if (error.response.status === 401) {
        toast.error("Para añadir al carrito inicia sesión", {
          action: {
            label: "Iniciar sesion",
            onClick: () => navigate('/auth/login'),
          }
        });
      } else {
        toast.error("Ha ocurrido un error inseperado", { description: error.response.data.error });
      }
    }

  }



}

