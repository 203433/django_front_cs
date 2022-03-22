import axios from "axios";
import './Register.scss';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

function Register() {
    const [registro, setRegistro] = useState(false);
    let warnings = "";
    const register_user = () => {
        var postData = {
            username: document.getElementById('user').value,
            password: document.getElementById('pass').value,
            email: document.getElementById('email').value,
            last_name: document.getElementById('lastName').value,
            first_name: document.getElementById('firstName').value,
            password2: document.getElementById('pass2').value
        }

        axios.post("http://localhost:8000/api/v1/register/user/", postData, {
            Headers:
            {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            alert("Registro exitoso");
            console.log(response.data);
            setRegistro(true);
        }).catch((error) => {
            console.log(error.response.data);
            warnings = error.response.data;
        });
       
        document.getElementById("warning").textContent = warnings;
    };
    
    return (
                <div>
                <Form className="px-14  mt-7 "> 
                    <Form.Group className="text-center"    >
                        <Form.Label className="fw-bold">Nombre</Form.Label>
                        <Form.Control type="text" className="text-center fw-light" placeholder="Nombre" id="firstName"   />
                    </Form.Group>

                    <Form.Group className="mb-3 text-center mt-3"  >
                        <Form.Label className="fw-bold" >Apellido</Form.Label>
                        <Form.Control  type="text" placeholder="Apellido"  className="text-center fw-light fs-6 " id="lastName" />
                    </Form.Group> 

                    <Form.Group className="text-center"    >
                        <Form.Label className="fw-bold">Clave</Form.Label>
                        <Form.Control type="password" className="text-center fw-light" placeholder="clave" id="pass"    />

                    </Form.Group>

                    <Form.Group className="mb-3 text-center mt-3"  >
                        <Form.Label className="fw-bold" >Repita la clave</Form.Label>
                        <Form.Control  type="password" placeholder="Repita la clave"  className="text-center fw-light fs-6 " id="pass2"/>
                    </Form.Group> 

                    <Form.Group className="text-center" >
                        <Form.Label className="fw-bold">Usuario</Form.Label>
                        <Form.Control type="text" className="text-center fw-light" placeholder="Usuario" id="user"   />
                    </Form.Group>

                    <Form.Group className="mb-3 text-center mt-3"  >
                        <Form.Label className="fw-bold" >Email</Form.Label>
                        <Form.Control  type="email" placeholder="Email"  className="text-center fw-light fs-6 " id="email"/>
                        <p id="message"></p>
                        
                        <Button  variant="dark" onClick={register_user}> Register </Button>
                        {registro === true && <Navigate to={'/Login'}/>}
                    </Form.Group> 
                </Form>
                </div>
    )
}

export default Register;