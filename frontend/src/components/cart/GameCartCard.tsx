// import './GameCard.css'
import { Link } from 'react-router-dom'
import { useGame } from '@/queries/games/useGame'
import { Button } from '@/components/ui/button'
import { useRemoveFromCart } from '@/mutations/cart/useCart'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import Loading from '../ui/loading'


export default function GameCartCard({ id }: { id: any }) {
  // console.log("GAME ",game);
  let { data: game, isLoading } = useGame(id);
  const { mutateAsync: removeFromCart } = useRemoveFromCart();

  if (isLoading) return <Loading/>
  
  if (game == null) {
    return <p> No se ha encontrado el juego</p>
  }

  const Remove = async () => {
    try {
      await removeFromCart(game.id || -1);
    } catch (error: any) {
      console.error("Error removeFromCart ", error);
      toast.error("Error inseperado");
    }
  } 

  return (
    <>
      <div className='flex gap-3 p-3 border-b border-gray-700 hover:bg-gray-800/50 transition-colors'>
        <Link to={`/details/${game.slug}`} className='flex-shrink-0'>
          <img 
            className='w-20 h-20 object-cover rounded' 
            src={game.images[0]} 
            alt={game.nom}
          />
        </Link>
        <div className='flex-1 flex flex-col justify-between'>
          <Link to={`/details/${game.slug}`}>
            <h3 className='font-semibold text-sm hover:text-blue-400 transition-colors'>
              {game.nom}
            </h3>
          </Link>
          <div className='flex items-center justify-between'>
            <span className='text-lg font-bold'>{game.precio}€</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={Remove}
              className='text-red-400 hover:text-red-300 hover:bg-red-950/20'
            >
              <Trash2 className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}