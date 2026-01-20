import './GameCard.css'
import type { Game } from '../../types/game'
import { Link } from 'react-router-dom'


export default function GameCard({ game }: { game: Game }) {
  // console.log("GAME ",game);

  return (
    <>
      <Link to={`/details/${game.slug}`}>
        <div className='gameDiv'>
          <img className='gameImg' src={game.images[0]}></img>
          <div className='gameBody'>
            <h1 className='gameNom'>{game.nom}</h1>
            <h2 className='gamePrecio'>{game.precio}€</h2>
          </div>
        </div>
      </Link>
    </>
  )





}