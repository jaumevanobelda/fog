import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useCategories } from "@/queries/categories/useCategories"
import { Loader2Icon, TagIcon } from "lucide-react"
import { CategoryDialog } from "@/components/categories/CategoryDialog"
import { CategoryCard } from "@/components/categories/CategoryCard"
import { useGetUsers } from "@/queries/auth/useUser"
import DasboardUserCard from "@/components/user/DasboardUserCard"
import { CreateUserDialog } from "@/components/user/CreateUserDialog"

export default function DashboardUsers() {
  const { data: users, isLoading, error } = useGetUsers()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  console.log("categories ",users);
  
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
        <p className="text-red-400">Error al cargar los usuarios</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Administrar Usuarios</h1>
        </div>

        <CreateUserDialog
          isOpen={isCreateOpen}
          setIsOpen={setIsCreateOpen}
        />
      </div>

      {users && users.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <TagIcon className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-300">No hay Usuarios</h3>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users?.map((user:any) => (
            <DasboardUserCard
                key={user.username}
                user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

