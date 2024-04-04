import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Nav() {
  const navigate=useNavigate();
  const auth=localStorage.getItem('user');
  const logout=()=>{
    localStorage.clear();
    navigate('/signup')
  }
  return (
    <div>
      <img
      alt='logo' className='logo'
      src="https://i.pinimg.com/564x/17/ed/9b/17ed9bc6ee239639cad5d886877fc5d4.jpg"/>
      {auth?
      <ul className="nav-link">
        <li><Link to='/'>Products</Link></li>
        <li><Link to='/add'> Add Products</Link></li>
        <li><Link to='/update'>Update Products</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/signup' onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
        </ul>
       
        :<ul className="nav-link nav-right">
           <li><Link to='/signup'>SignUp</Link></li>
           <li><Link to='/login'>Login</Link></li>
        </ul>
       
        }
      
    </div>
  )
}

export default Nav
