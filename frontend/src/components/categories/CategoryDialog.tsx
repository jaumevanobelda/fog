import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon, Loader2Icon } from "lucide-react"
import { useCreateCategory, useUpdateCategory } from "@/mutations/categories/useCategoryMutations"
import type { Categoria } from "@/types/categoria"

interface CategoryDialogProps {
  mode: "create" | "edit"
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  editingCategory?: Categoria | null
  onEditComplete?: () => void
}

const initialFormData = { nom: "" }

export function CategoryDialog({
  mode,
  isOpen,
  setIsOpen,
  editingCategory,
  onEditComplete
}: CategoryDialogProps) {
  const [formData, setFormData] = useState(initialFormData)
  
  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory()
  
  const isCreate = mode === "create"
  const isPending = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (mode === "edit" && editingCategory) {
      setFormData({ nom: editingCategory.nom })
    }
  }, [mode, editingCategory])

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      resetForm()
      onEditComplete?.()
    }
  }

  const handleSubmit = () => {
    if (isCreate) {
      createMutation.mutate(formData, {
        onSuccess: () => {
          handleOpenChange(false)
        }
      })
    } else if (editingCategory) {
      updateMutation.mutate(
        { slug: editingCategory.slug, data: formData },
        {
          onSuccess: () => {
            handleOpenChange(false)
          }
        }
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {isCreate && (
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <PlusIcon className="h-4 w-4 mr-2" />
            Nueva Categoría
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Crear Nueva Categoría" : "Editar Categoría"}
          </DialogTitle>
          <DialogDescription>
            {isCreate 
              ? "Añade una nueva categoría para clasificar los juegos."
              : "Modifica los datos de la categoría."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nom">Nombre</Label>
            <Input
              id="nom"
              placeholder="Nombre de la categoría"
              value={formData.nom}
              onChange={(e) => setFormData({ nom: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !formData.nom.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isPending && <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />}
            {isCreate ? "Crear" : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
