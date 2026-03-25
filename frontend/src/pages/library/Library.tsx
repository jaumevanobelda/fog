import { useLibrary } from "@/queries/library/useLibrary";
import { ScrollArea } from "@/components/ui/scroll-area"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import GameLibraryCard from "@/components/library/GameLibraryCard";
import './library.css';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { useAddCollection, useMoveGameToCollection } from "@/mutations/library/useLibrary";
import CollectionCard from "@/components/library/CollectionCard";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { toast } from 'sonner';
import Loading from "@/components/ui/loading";



export default function Library() {
    scrollTo({ top: 0 });
    const { data, isLoading } = useLibrary();
    const library = data?.library || [];

    const [currentGame, setCurrentGame] = useState<{ slug: string, collection: string } | null>(null);
    const [nuevacollection, setNuevacollection] = useState<string>('');
    const [activeGame, setActiveGame] = useState<string | null>(null);

    const { mutate: addcollection } = useAddCollection();
    const { mutate: moveGame } = useMoveGameToCollection();

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

    const handleDragStart = (event: DragStartEvent) => {
        if (event.active.data.current) {
            setActiveGame(event.active.data.current.gameName);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveGame(null);

        if (!over || !active.data.current) return;
        console.log("current ", active.data.current);
        
        const fromCollectionId = active.data.current.fromCollectionId;
        const toCollectionId = over.data.current?.collectionId;
        const gameSlug = active.data.current.gameSlug;
        if (fromCollectionId === toCollectionId) return;

        moveGame({ fromCollectionId, toCollectionId, slug: gameSlug },
            {
                onError: (error: any) => {
                    toast.error(error?.response?.data?.error || 'Error al mover el juego');
                },
            }
        );
    };

    useEffect(() => {
        console.log("Library ", library);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prevOverflow; }
    }, []);


    if (isLoading) return <Loading />

    return (
        <>
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                autoScroll={false}
            >
                <div className="library-container">
                    <ResizablePanelGroup orientation="horizontal" className="library-panel-group">
                        <ResizablePanel defaultSize="22%" minSize="15%" maxSize="50%">
                            <div className="h-full bg-gray-900 border-r border-gray-800 " >
                                <ScrollArea className="h-full">
                                    {library.map((collection: any) => (
                                        <CollectionCard collection={collection} currentGame={currentGame} setCurrentGame={setCurrentGame} key={collection.slug}></CollectionCard>
                                    ))}

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="m-2">
                                                Agregar una coleccion
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Crear nueva colección</DialogTitle>
                                                <DialogDescription></DialogDescription>
                                            </DialogHeader>
                                            {/* <Label htmlFor="username-1">Crear nueva colección </Label> */}
                                            <Input id="nom" name="nom" placeholder="Introduce el nombre de la colección"
                                                value={nuevacollection}
                                                onChange={(e) => setNuevacollection(e.target.value)} />

                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button onClick={() => { addcollection(nuevacollection); setNuevacollection(''); }}
                                                        disabled={nuevacollection.trim() === ''}>
                                                        Enviar
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </ScrollArea>
                            </div>
                        </ResizablePanel>

                        <ResizableHandle withHandle className="bg-gray-800 hover:bg-gray-700" />

                        <ResizablePanel defaultSize="70%">
                            {currentGame != null ? (
                                <GameLibraryCard slug={currentGame.slug} />
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

                <DragOverlay>
                    {activeGame ? (
                        <div className="px-4 py-3 rounded-lg bg-blue-600/80 shadow-2xl border border-blue-400 backdrop-blur-sm">
                            <h3 className="font-medium text-sm text-white truncate max-w-[200px]">
                                {activeGame}
                            </h3>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}
