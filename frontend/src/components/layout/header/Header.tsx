import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
  const userLogged = false;
  return (
    <>
      <div className='navmenu'>
        <nav className="topnav">
          <div><Link to="/">shop</Link></div>
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
        <div><button>logout</button></div>
      </>
    )
  }
}


