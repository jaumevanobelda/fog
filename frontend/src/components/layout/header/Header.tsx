import { useUser } from '../../../context/userContext';
import { Link } from 'react-router-dom'
import { logout } from "../../../services/authService";
import Cart from '@/components/cart/Cart';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserRoundIcon, StoreIcon, LibraryIcon, LogOutIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Friends } from '@/components/user/Friends';

export default function Header() {
  const { userLogged, user } = useUser();
  console.log("USER ", user);


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Fog
            </Link>

            <nav className="hidden sm:flex items-center gap-1">
              <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all">
                <StoreIcon className="h-4 w-4" />
                <span>Tienda</span>
              </Link>
              <Link to="/library" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all">
                <LibraryIcon className="h-4 w-4" />
                <span>Biblioteca</span>
              </Link>
              {["DEVELOPER", "ADMIN"].includes(user?.role!) ?
                <Link to="/dashboardGames" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all">
                  <span>Administrar juegos</span>
                </Link> : <></>}
              {user?.role! === "ADMIN" ?
                <Link to="/dashboardCategories" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all">
                  <span>Administrar categorias</span>
                </Link>: <></>}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {userLogged ? loggedMenu() : notLoggedMenu()}
          </div>
        </div>
      </div>
    </header>
  )

  function notLoggedMenu() {
    return (
      <>
        <Link to="/auth/login">
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            Iniciar sesión
          </Button>
        </Link>
        <Link to="/auth/register">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Registrarse
          </Button>
        </Link>
      </>
    )
  }

  function loggedMenu() {
    return (
      <>
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full text-gray-300 hover:text-white hover:bg-gray-800/50">
              <UserRoundIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="center">
            <Friends />
          </PopoverContent>
        </Popover> */}

        <Cart />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-9 w-9 border-2 border-gray-700 hover:border-blue-500 transition-colors">
                <AvatarImage src={user?.image} alt={user?.username} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <div className="px-3 py-2 border-b border-gray-700">
              <p className="text-sm font-medium text-white">{user?.username}</p>
              {user?.email && <p className="text-xs text-gray-500">{user.email}</p>}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }
}


