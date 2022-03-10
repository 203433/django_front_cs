import axios from "axios";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import './Login.scss';

function Login() {

    const [logeo, setLogeo] = useState(false);

    const consumir_login = () => {
        let warnings = "";
        var postData = {
            username: document.getElementById('user-Login').value,
            password: document.getElementById('pass-Login').value
        }
        axios.post("http://localhost:8000/api/v1/login/", postData, {
            Headers:
            {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response.data.token);
            localStorage.setItem('token', response.data['token']);
            localStorage.setItem('id_user', response.data['user_id']);
            setLogeo(true);
        }).catch((error) => {
            console.log(error.response.data);
            if (error.response.data.non_field_errors != null) {
                warnings = error.response.data.non_field_errors[0];
            } else {
                if (error.response.data.username != null && error.response.data.password == null) {
                    warnings = "Username is empty";
                } else if (error.response.data.username == null && error.response.data.password != null) {
                    warnings = "Password is empty";
                } else {
                    warnings = "Username and password are empty";
                }
            }
            document.getElementById("warning").textContent = warnings;
            setLogeo(false);
        });
    };
    return (
            <div>
                <Form className="px-14  mt-7"> 
                    <Form.Group className="text-center"    >
                        <Form.Label className="fw-bold">Usuario</Form.Label>
                        <Form.Control type="user" className="text-center fw-light" placeholder="Usuario" id="user-Login"   />
                        <Form.Text className="text-muted ">
                        No compartiremos ningun dato tuyo.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 text-center mt-3"  >
                        <Form.Label className="fw-bold" >Clave</Form.Label>
                        <Form.Control  type="password" placeholder="Clave"  className="text-center fw-light fs-6 " id="pass-Login"/>
                        <p id="warning" className="mt-2" ></p>
                        <Button variant="dark" className="mt-4"  onClick={consumir_login} >Iniciar Sesion</Button>{' '}
                        {(localStorage.getItem('token')!==null || logeo === true)&& <Navigate to={'/profile/User'+localStorage.getItem('id_user')}/>}
                    </Form.Group> 
                </Form>


  
            </div>

    )
}

export default Login;