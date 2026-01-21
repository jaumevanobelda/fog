import { useGame } from '@/queries/games/useGame'
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';


export default function GameLibraryCard({ id }: { id: number }) {

    let { data: game, isLoading } = useGame(id);
    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-full'>
                <p className='text-gray-400'>Cargando...</p>
            </div>
        )
    }
    if (game == null) {
        return (
            <div className='flex items-center justify-center h-full'>
                <p className='text-gray-400'>Error al cargar el juego</p>
            </div>
        )
    }


    return (
        <div className='h-full overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-950'>
            <div className='p-6 flex flex-col items-center gap-6 w-full'>
                <div className='w-full rounded-lg overflow-hidden shadow-xl'>
                    <img
                        src={game.images?.[0] || '/placeholder-game.png'}
                        alt={game.nom}
                        className='w-full h-auto max-h-[70vh] object-cover'
                    />
                </div>

                <div className='w-full flex justify-center'>
                    <Button className='px-8 py-3' >Jugar</Button>
                </div>

            </div>
        </div>
    )
}