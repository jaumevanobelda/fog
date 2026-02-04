import { useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import type { Game, GameFormData } from "@/types/game"
import { PlusIcon, XIcon, Loader2Icon } from "lucide-react"
import { useCreateGame, useUpdateGame } from "@/mutations/games/useGameMutations"
import { useCategories } from "@/queries/categories/useCategories"

const initialFormData: GameFormData = {
  nom: "",
  precio: 0,
  descripcion: "",
  categories: [],
  images: []
}

interface GameDialogProps {
  mode: "create" | "edit"
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  editingGame?: Game | null
}

export function GameDialog({ mode, isOpen, setIsOpen, editingGame }: GameDialogProps) {
  const createMutation = useCreateGame()
  const updateMutation = useUpdateGame()
  const { data: categories } = useCategories();
  
  const [formData, setFormData] = useState<GameFormData>(editingGame || initialFormData)
  const [newImageUrl, setNewImageUrl] = useState("")

  const isCreate = mode === "create"
  const isPending = isCreate ? createMutation.isPending : updateMutation.isPending
  console.log("editingGame ",editingGame);
  
  const resetForm = () => {
    setFormData(initialFormData)
    setNewImageUrl("")
  }

  const handleSubmit = () => {
    if (!formData.nom.trim() || formData.precio < 0) return

    if (isCreate) {
      createMutation.mutate(formData, {
        onSuccess: () => {
          setIsOpen(false)
          resetForm()
        }
      })
    } else if (editingGame) {
      updateMutation.mutate({ slug: editingGame.slug, data: formData },
        {
          onSuccess: () => {
            setIsOpen(false)
            resetForm()
          }
        }
      )
    }
  }

  const toggleCategory = (categorySlug: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.includes(categorySlug)
        ? formData.categories.filter(categoria => categoria !== categorySlug)
        : [...formData.categories, categorySlug]
    })
  }

  const addImage = () => {
    if (!newImageUrl.trim()) return
    setFormData({
      ...formData,
      images: [...formData.images, newImageUrl.trim()]
    })
    setNewImageUrl("")
  }

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {isCreate && (
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <PlusIcon className="h-4 w-4 mr-2" />
            Nuevo Juego
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Crear Nuevo Juego" : "Editar Juego"}
          </DialogTitle>
          <DialogDescription>
            {isCreate
              ? "Añade un nuevo juego a la plataforma."
              : "Modifica los datos del juego."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid gap-2">
            <Label htmlFor="nom">Nombre</Label>
            <Input
              id="nom"
              placeholder="Nombre del juego"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="precio">Precio (€)</Label>
            <Input
              id="precio"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              placeholder="Descripción del juego"
              rows={4}
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label>Categorías</Label>
            <div className="flex flex-wrap gap-2">
              {categories?.map((category) => (
                <Button
                  key={category.slug}
                  type="button"
                  variant={formData.categories.includes(category.slug) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCategory(category.slug)}
                  className={formData.categories.includes(category.slug)
                    ? "bg-blue-600 hover:bg-blue-700"
                    : ""}
                >
                  {category.nom}
                </Button>
              ))}
              {(!categories || categories.length === 0) && (
                <p className="text-gray-500 text-sm">No hay categorías disponibles</p>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Imágenes</Label>
            <div className="flex gap-2">
              <Input
                placeholder="URL de la imagen"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
              />
              <Button type="button" variant="outline" onClick={addImage}>
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            {formData.images.length > 0 && (
              <div className="grid gap-2 mt-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-16 h-10 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/64x40?text=Error"
                      }}
                    />
                    <span className="flex-1 text-sm text-gray-400 truncate">{image}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isPending || !formData.nom.trim()} className="bg-blue-600 hover:bg-blue-700">
            {isPending && <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />}
            {isCreate ? "Crear" : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
