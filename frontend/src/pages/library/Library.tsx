import { useLibrary } from "@/queries/library/useLibrary";
import { ScrollArea } from "@/components/ui/scroll-area"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import GameLibraryCard from "@/components/library/GameLibraryCard";
import './library.css';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";


export default function Library() {
    const { data, isLoading } = useLibrary();
    const library = data?.library || [];

    const [currentGame, setCurrentGame] = useState<number | null>(null);
    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prevOverflow; }
    }, []);

    if (isLoading) return <p>Cargando</p>
    console.log("Library ", library);

    return (
        <>
            <div className="library-container">
                <ResizablePanelGroup orientation="horizontal" className="library-panel-group">
                    <ResizablePanel defaultSize="22%" minSize="15%" maxSize="50%">
                        <div className="h-full bg-gray-900 border-r border-gray-800">
                            <ScrollArea className="h-full">
                                {library.map((collection: any) => (
                                    <Collapsible key={collection.id}>
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
                                                {collection.games.map((game: any) => (
                                                    <div
                                                        key={game.id}
                                                        onClick={() => setCurrentGame(game.id)}
                                                        className={`
                                                group cursor-pointer px-4 py-3 rounded-lg mb-2 transition-all duration-200
                                                ${currentGame === game.id
                                                                ? 'bg-blue-600/20 border-l-4 border-blue-500'
                                                                : 'bg-gray-800/50 hover:bg-gray-700/50 border-l-4 border-transparent'
                                                            }`}>
                                                        <h3 className={`
                                                font-medium truncate text-sm
                                                ${currentGame === game.id ? 'text-blue-300' : 'text-white group-hover:text-blue-200'}
                                            `}>
                                                            {game.nom}
                                                        </h3>
                                                    </div>
                                                ))}
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ))}
                            </ScrollArea>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle className="bg-gray-800 hover:bg-gray-700" />

                    <ResizablePanel defaultSize="70%">
                        {currentGame != null ? (
                            <GameLibraryCard id={currentGame} />
                        ) : (
                            <div className="h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950">
                                <div className="text-center space-y-4">
                                    <div className="text-6xl">🎮</div>
                                    <h2 className="text-2xl font-bold text-gray-300">Selecciona un juego</h2>
                                    <p className="text-gray-500">Elige un juego de tu biblioteca</p>
                                </div>
                            </div>
                        )}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    );
}
