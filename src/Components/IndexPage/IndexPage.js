import {useNavigate} from 'react-router-dom'
import './IndexPage.css';
import { Button, ButtonGroup } from 'react-bootstrap';
export default function IndexPage() {
    const navigate = useNavigate()
    const handleClickMenu= () =>{
        navigate("/")
    }
    const handleClickDocumentation= () =>{
        navigate("/Documentation")
    }
    const handleClickComponents= () =>{
        navigate("/Components")
    }
    const handleClickSuscriptions= () =>{
        navigate("/Suscriptions")
    }
    const handleClickAbout= () =>{
        navigate("/About")
    }
    const handleClickLogin= () =>{
        navigate("/Login")
    }
    const handleClickRegister= () =>{
        navigate("/Register")
    }

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
                <ButtonGroup aria-label="Basic example">
                <Button variant="dark" onClick={handleClickMenu}>
                    Menu                    
                </Button>
                <Button variant="dark" onClick={handleClickDocumentation}>
                    Documentation                   
                </Button>
                <Button variant="dark" onClick={handleClickComponents}>
                    Components           
                </Button>
                <Button variant="dark" onClick={handleClickSuscriptions}>
                    Suscriptions                    
                </Button>
                <Button variant="dark" onClick={handleClickAbout}>
                    About                    
                </Button>                
                </ButtonGroup>
            </div>

            <div className="navbar-end">
            <div className="navbar-item">
                <div className="buttons">
                <ButtonGroup>       

                <Button variant="dark" onClick={handleClickLogin}>
                    Login                    
                </Button>
                <Button variant="dark" onClick={handleClickRegister}>
                    Register                    
                </Button>      
                </ButtonGroup>       
 
                </div>
            </div>
            </div>
        </div>
        </nav>
    </div>
  )
}
