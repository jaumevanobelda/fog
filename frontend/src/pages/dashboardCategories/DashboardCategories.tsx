import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useCategories } from "@/queries/categories/useCategories"
import { Loader2Icon, TagIcon } from "lucide-react"
import { CategoryDialog } from "@/components/categories/CategoryDialog"
import { CategoryCard } from "@/components/categories/CategoryCard"

export default function DashboardCategories() {
  const { data: categories, isLoading, error } = useCategories()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  console.log("categories ",categories);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2Icon className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-400">Error al cargar las categorías</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Administrar Categorías</h1>
          <p className="text-gray-400 mt-1">Gestiona las categorías de juegos de la plataforma</p>
        </div>

        <CategoryDialog
          mode="create"
          isOpen={isCreateOpen}
          setIsOpen={setIsCreateOpen}
        />
      </div>

      {categories && categories.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <TagIcon className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-300">No hay categorías</h3>
            <p className="text-gray-500 mt-1">Crea tu primera categoría para empezar</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories?.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
            />
          ))}
        </div>
      )}
    </div>
  )
}

