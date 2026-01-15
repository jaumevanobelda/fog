import './Shop.css'
import { useGames } from '../../queries/games/useGames';
import GameList, {  } from '../../components/game/GameList';

export default function Shop() {

  const { isLoading,isError,error,isFetching,data } = useGames();

  if(isLoading) return <p> Cargando...</p>

  if(isError){
    console.log("Error ",error);
    
    return <p>Error</p>
  } 

  return (
    <>
      <div>
        <h1> Shop</h1>
        <GameList games={data!}></GameList>

      </div>
      {isFetching? <p> Cargando mas ... </p> :<></>}
    </>
  )


}

