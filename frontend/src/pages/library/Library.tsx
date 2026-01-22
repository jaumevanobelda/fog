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
import { useAddCollection } from "@/mutations/library/useLibrary";
import CollectionCard from "@/components/library/collectionCard";



export default function Library() {
    const { data, isLoading } = useLibrary();
    const library = data?.library || [];

    const [currentGame, setCurrentGame] = useState<number | null>(null);
    const [nuevacollection, setNuevacollection] = useState<string>('');
    const { mutate: addcollection } = useAddCollection();
    useEffect(() => {
        console.log("Library ", library);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prevOverflow; }
    }, []);


    if (isLoading) return <p>Cargando</p>

    return (
        <>
            <div className="library-container">
                <ResizablePanelGroup orientation="horizontal" className="library-panel-group">
                    <ResizablePanel defaultSize="22%" minSize="15%" maxSize="50%">
                        <div className="h-full bg-gray-900 border-r border-gray-800">
                            <ScrollArea className="h-full">
                                {library.map((collection: any) => (
                                    <CollectionCard collection={collection} currentGame={currentGame} setCurrentGame={setCurrentGame} key={collection.id}></CollectionCard>
                                ))}

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
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
