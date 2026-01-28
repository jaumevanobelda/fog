import { useUser } from '../../../context/userContext';
import './Header.css'
import { Link } from 'react-router-dom'
import { logout } from "../../../services/authService";
import Cart from '@/components/cart/Cart';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const {userLogged,user} =  useUser();
  // console.log("User ",user);
  
  return (
    <>
      <div className='navmenu'>
        <nav className="topnav">
          <div><Link to="/">shop</Link></div>
          <div><Link to="/library">Biblioteca</Link></div>
        </nav>
        <div className='userMenu'>
          {userLogged ? Logged() : noLogged()}
        </div>
        
      </div>
    </>
  )



  function noLogged() {
    return (
      <>
        <div><Link to="/auth/login">login</Link></div>
        <div><Link to="/auth/register">register</Link></div>
      </>
    )
  }
  function Logged() {
    return (
      <>
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user?.image} alt={user?.username} />
            <AvatarFallback>{user?.username || "Avatar"} </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
          <DropdownMenuItem  onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
    <Cart></Cart>
      </>
    )
  }
}


