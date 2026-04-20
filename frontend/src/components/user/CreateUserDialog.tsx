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
import { useUser } from "@/context/userContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useCreateUser } from "@/mutations/auth/useUser"
import { toast } from "sonner"


interface CategoryDialogProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function CreateUserDialog({
  isOpen,
  setIsOpen,
}: CategoryDialogProps) {
  const [user, setUser] = useState({ username: "", email: "", password: "", role: "DEVELOPER" })

  const { isPending, mutateAsync } = useCreateUser()
  const role = useUser().user?.role;




  async function enviar() {

    try {
      const data = await mutateAsync(user);
      console.log("Data ", data);
      setIsOpen(false);
    } catch (error:any) {
      console.log("error ", error);
      console.log("error ", error.response.data.errors);
      toast.error(`Ha ocurrido un error: ${error.response.data.errors?.join(" ") || "Error inseperado"}`)
    }


  }
  function validateUser() {
    if (user.username == "") return false
    if (user.email == "") return false
    if (user.password == "") return false
    return true
  }
  console.log("formData ", user);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>

      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusIcon className="h-4 w-4 mr-2" />
          {role == "SUPERADMIN" ? "Crear usuario" : "Crear developer"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {role == "SUPERADMIN" ? "Crear usuario" : "Crear developer"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Nombre de usuario</Label>
            <Input
              id="nom"
              placeholder="Nombre de usuario"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />

            <Label>Email</Label>
            <Input
              id="nom"
              placeholder="Email"
              value={user.email}
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />
            <Label>Contraseña</Label>
            <Input
              id="nom"
              placeholder="Contraseña"
              type="password"

              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />
            {role == "SUPERADMIN" && (<>
              <Label>Rol</Label>
              <Select onValueChange={(value) => setUser({ ...user, role: value })} value={user.role}>
                <SelectTrigger className="flex-1 h-9 bg-gray-800 border-gray-700 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="DEVELOPER">Developer</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </>)}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={enviar}
            disabled={!validateUser() || isPending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isPending && <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />}
            Crear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
