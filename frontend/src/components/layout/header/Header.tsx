import { useUser } from '../../../context/userContext';
import './Header.css'
import { Link } from 'react-router-dom'
import { logout } from "../../../services/authService";
import Cart from '@/components/cart/Cart';


export default function Header() {
  const {userLogged} =  useUser();
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
        <div><button onClick={logout}>logout</button></div>
          <Cart></Cart>
      </>
    )
  }
}


