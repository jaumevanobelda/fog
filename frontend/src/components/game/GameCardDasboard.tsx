import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import type { Game } from "@/types/game"
import { PencilIcon, Trash2Icon, ImageIcon, Loader2Icon, CheckCircle2Icon, XCircleIcon } from "lucide-react"
import { useDeleteGame, useActivateGame } from "@/mutations/games/useGameMutations"
import { GameDialog } from "./GameDialog"

export function GameCardDasboard({ game }: { game: Game }) {
  const [isOpen, setIsOpen] = useState(false)

  const deleteMutation = useDeleteGame()
  const activateMutation = useActivateGame()

  return (
    <>
      <Card className={`bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors overflow-hidden ${!game.isActive ? 'opacity-60' : ''}`}>
        {game.images && game.images.length > 0
          ? (
            <div className="relative h-40 overflow-hidden">
              <img
                src={game.images[0]}
                alt={game.nom}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x160?text=No+Image"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-blue-600 rounded text-sm font-semibold">
                {game.precio.toFixed(2)}€
              </div>
            </div>
          ) : (
            <div className="relative h-40 bg-gray-700 flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-gray-500" />
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-blue-600 rounded text-sm font-semibold">
                {game.precio.toFixed(2)}€
              </div>
            </div>
          )}

        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg text-white">{game.nom}</CardTitle>
            {game.isActive
              ? (
                <CheckCircle2Icon className="h-4 w-4 text-green-500" />
              ) : (
                <XCircleIcon className="h-4 w-4 text-red-500" />
              )}
          </div>
          <CardDescription className="text-gray-500 text-sm line-clamp-2">
            {game.descripcion || "Sin descripción"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-1 mb-3 min-h-[40px] items-center">
            {game.categories?.map((categoria) => (
              <span
                key={categoria}
                className="px-2 py-0.5 text-xs bg-gray-700 text-gray-300 rounded"
              >
                {categoria}
              </span>
            ))}
          </div>


          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setIsOpen(true)}
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Editar
            </Button>

            {game.isActive ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/30"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Desactivar juego?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción desactivará el juego "{game.nom}". Los usuarios que ya lo hayan comprado seguirán teniendo acceso.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteMutation.mutate(game.slug)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {deleteMutation.isPending && <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />}
                      Desactivar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => activateMutation.mutate(game.slug)}
                disabled={activateMutation.isPending}
                className="text-green-400 hover:text-green-300 hover:bg-green-500/10 border-green-500/30"
              >
                {activateMutation.isPending && <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />}
                <CheckCircle2Icon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {isOpen ?
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <GameDialog
            mode="edit"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            editingGame={game}
          />
        </Dialog>
        : <></>}
    </>
  )
}