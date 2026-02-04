import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import type { Categoria } from "@/types/categoria"
import { PencilIcon, Trash2Icon, TagIcon, Loader2Icon, CheckCircle2Icon, XCircleIcon } from "lucide-react"
import { useDeleteCategory, useActivateCategory } from "@/mutations/categories/useCategoryMutations"
import { CategoryDialog } from "./CategoryDialog"

export function CategoryCard({ category }: {category: Categoria}) {
  const [isOpen, setIsOpen] = useState(false)

  const deleteMutation = useDeleteCategory()
  const activateMutation = useActivateCategory()
  const isActive = category.isActive !== false


  return (
    <>
      <Card className={`bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors ${!isActive ? 'opacity-60' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <TagIcon className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg text-white">{category.nom}</CardTitle>
                  {isActive ? (
                    <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircleIcon className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <CardDescription className="text-gray-500 text-sm">
                  /{category.slug}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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

            {isActive ? (
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
                    <AlertDialogTitle>¿Desactivar categoría?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción desactivará la categoría "{category.nom}". Los juegos asociados no se verán afectados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteMutation.mutate(category.slug)} className="bg-red-600 hover:bg-red-700">
                      {deleteMutation.isPending && <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />}
                      Desactivar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button variant="outline" size="sm" onClick={() => activateMutation.mutate(category.slug)} disabled={activateMutation.isPending}
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
          <CategoryDialog
            mode="edit"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            editingCategory={category}
            onEditComplete={() => setIsOpen(false)}
          />
        </Dialog>
        : <></>}
    </>
  )
}
