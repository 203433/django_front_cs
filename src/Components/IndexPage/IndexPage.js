import {NavLink} from 'react-router-dom'
import './IndexPage.css';
export default function IndexPage() {
  return (
    <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">


            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
            <a className="navbar-item">
                <NavLink to= '/'>  Menu  </NavLink>
                {/* <NavLink className={({isActive}) => (isActive ? "" : "")} to= '/'>  Menu  </NavLink> */}

            </a>

            <a className="navbar-item">
                <NavLink to= '/NotFound'>  Documentacion  </NavLink>
            </a>

            <a className="navbar-item">
                <NavLink to= '/NotFound'>  Registros  </NavLink>
            </a>

            <a className="navbar-item">
                <NavLink to= '/NotFound'>  Videos </NavLink>
            </a>            

            </div>

            <div className="navbar-end">
            <div className="navbar-item">
                <div className="buttons">
                <a className='navbar-item'>
                    <NavLink to= '/Login'>  Iniciar sesion  </NavLink>
                </a>

                <a className="navbar-item">
                    <NavLink   to= '/Register'>  Registro </NavLink>
                </a>
                </div>
            </div>
            </div>
        </div>
        </nav>
    </div>
  )
}
