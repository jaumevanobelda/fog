
import { Button } from '../ui/button';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Empty, EmptyContent, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRightIcon, GripVertical, Trash2Icon } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';
import type { Collection } from '@/types/collection';
import { useRef, useState } from 'react';
import { useRemoveCollection } from '@/mutations/library/useLibrary';


function DraggableGame({ game, collectionId, currentGame, setCurrentGame }
    : { game: { id: number, nom: string }; collectionId: string; currentGame: { id: number, collection: string } | null; setCurrentGame: Function; }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `game-${game.id}-from-${collectionId}`,
        data: {
            gameId: game.id,
            gameName: game.nom,
            fromCollectionId: collectionId,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div onClick={() => setCurrentGame({ id: game.id, collection: collectionId })} {...listeners} {...attributes}
            ref={setNodeRef}
            style={style}
            className={`group cursor-pointer px-4 py-3 rounded-lg mb-2 transition-all duration-200 flex items-center gap-2
                ${currentGame?.id === game.id && currentGame?.collection === collectionId
                    ? 'bg-blue-600/20 border-l-4 border-blue-500'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 border-l-4 border-transparent'
                }
                ${isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''}`}>
            <div className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300">
                <GripVertical size={16} />
            </div>
            <div className="flex-1">
                <h3 className={`font-medium truncate text-sm ${currentGame?.id === game.id && currentGame?.collection === collectionId ? 'text-blue-300' : 'text-white group-hover:text-blue-200'}`}>
                    {game.nom}
                </h3>
            </div>
        </div>
    );
}

export default function CollectionCard({ collection, currentGame, setCurrentGame }: { collection: Collection, currentGame: { id: number, collection: string } | null, setCurrentGame: Function; }) {
    const { isOver, setNodeRef } = useDroppable({
        id: `collection-${collection.id}`,
        data: {
            collectionId: collection.id,
            collectionName: collection.collection,
        },
    });
    const { mutate: removeCollection } = useRemoveCollection();

    const [open, setOpen] = useState(false);
    const over = useRef(isOver);
    over.current = isOver;
    if (isOver) {
        setTimeout(() => {
            if (over.current) setOpen(true)
        }, 800);
    }

    return (
        <Collapsible ref={setNodeRef} className={ isOver && open == false ? 'bg-blue-500/20 border-2 border-dashed border-blue-500 collection' : 'collection'} open={open} onOpenChange={setOpen}  >
            <CollapsibleTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="group hover:bg-accent hover:text-accent-foreground w-full justify-start transition-none">
                    <span className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2 collection-title">
                            <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                            <span className="truncate ">{collection.collection}</span>
                        </span>
                        {collection.collection === "Todos los juegos" ? null : (
                            <div
                                onClick={(e) => { e.stopPropagation(); removeCollection(collection.id); }}
                                className=" hover:text-red-400"
                                aria-label={`Eliminar colección ${collection.collection}`}
                            >
                                <Trash2Icon className="h-5 w-5" />
                            </div>
                        )}
                    </span>

                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 mt-1">
                <div
                    // ref={setNodeRef}
                    className={`p-2 rounded-lg transition-all duration-200 min-h-[60px]
                        ${isOver ? 'bg-blue-500/20 border-2 border-dashed border-blue-500' : ''}
                    `}
                >
                    {collection.games.length <= 0
                        ? <Empty className={`w-full border border-dashed p-3 sm:p-4 rounded-md flex flex-col items-center justify-center gap-1 min-h-[56px] sm:min-h-[84px]
                            ${isOver ? 'border-blue-500 bg-blue-500/10' : ''}
                        `}>
                            <EmptyHeader className="m-0 p-0">
                                <EmptyTitle className="text-sm sm:text-base text-center">
                                    {collection.collection === "Todos los juegos" ? "Biblioteca vacía" :
                                        isOver ? '¡Suelta aquí!' : 'Colección vacía'
                                    }
                                </EmptyTitle>
                            </EmptyHeader>
                            <EmptyContent className="text-xs sm:text-sm text-gray-400 text-center leading-tight">
                                {collection.collection === "Todos los juegos" ? "Compra juegos para llenar tu Biblioteca" :
                                    isOver ? 'Para añadir el juego' : 'Arrastra juegos a esta colección'
                                }
                            </EmptyContent>
                        </Empty>

                        : collection.games.map((game: { id: number, nom: string }) => (
                            <DraggableGame key={game.id} game={game} collectionId={collection.id} currentGame={currentGame} setCurrentGame={setCurrentGame} />
                        ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}