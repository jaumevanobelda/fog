import type { Game } from '../../types/game'
import GameCard from './GameCard'


export default function GameList ({games}:{games: Game[]}){
    // console.log("games ",games);    
    return (
        <>
            <div className="gamesList">
                {
                    games.map((game: Game) => {
                        return <GameCard game={game} key={game.id}></GameCard>
                    })
                }
            </div>
        </>
    )
}