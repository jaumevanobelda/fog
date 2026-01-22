
import { Button } from '../ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRightIcon } from 'lucide-react';
export default function CollectionCard({ collection,currentGame,setCurrentGame }: { collection: any,currentGame:Number |null,setCurrentGame:Function }) {



    return (
        <Collapsible >
            <CollapsibleTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="group hover:bg-accent hover:text-accent-foreground w-full justify-start transition-none">
                    <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                    {collection.collection}
                </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="ml-4 mt-1">
                <div className="p-2">
                    {collection.games.length <= 0
                        ? <Empty className="w-full border border-dashed p-3 sm:p-4 rounded-md flex flex-col items-center justify-center gap-1 min-h-[56px] sm:min-h-[84px]">
                            <EmptyHeader className="m-0 p-0">

                                <EmptyTitle className="text-sm sm:text-base text-center">Colección vacía</EmptyTitle>
                            </EmptyHeader>
                            <EmptyContent className="text-xs sm:text-sm text-gray-400 text-center leading-tight">
                                Añade juegos a esta colección
                            </EmptyContent>
                        </Empty>

                        : collection.games.map((game: any) => (
                            <div
                                key={game.id}
                                onClick={() => setCurrentGame(game.id)}
                                className={`group cursor-pointer px-4 py-3 rounded-lg mb-2 transition-all duration-200
                                                            ${currentGame === game.id
                                        ? 'bg-blue-600/20 border-l-4 border-blue-500'
                                        : 'bg-gray-800/50 hover:bg-gray-700/50 border-l-4 border-transparent'
                                    }`}>
                                <h3 className={`font-medium truncate text-sm
                                                            ${currentGame === game.id ? 'text-blue-300' : 'text-white group-hover:text-blue-200'}`}>
                                    {game.nom}
                                </h3>
                            </div>
                        ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}