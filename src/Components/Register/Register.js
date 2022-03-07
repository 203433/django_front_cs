import axios from "axios";
import { NavLink,Navigate } from "react-router-dom";
import { useState } from "react";

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
        <div className={Register.body}>
            <div className={Register.container}>
                <div className={Register.formContainer}>
                    <h1>Register</h1>
                    <div className={Register.formRegister}>
                        <div className={Register.group}>
                            <input type="text" id="firstName" required /> <span className={Register.borderBottom}></span>
                            <label>Name</label>
                        </div>
                        <div className={Register.group}>
                            <input type="text" id="lastName" required /> <span className={Register.borderBottom}></span>
                            <label>Last name</label>
                        </div>
                        <div className={Register.group}>
                            <input type="password" id="pass" required /> <span className={Register.borderBottom}></span>
                            <label>Password</label>
                        </div>
                        <div className={Register.group}>
                            <input type="password" id="pass2" required /> <span className={Register.borderBottom}></span>
                            <label id="lbl-pass2">Confirm password</label>
                        </div>
                        <div className={Register.group}>
                            <input type="text" id="user" required /> <span className={Register.borderBottom}></span>
                            <label>Username</label>
                        </div>
                        <div className={Register.group}>
                            <input type="email" id="email" required /> <span className={Register.borderBottom}></span>
                            <label>Email</label>
                        </div>
                        <p id="message"></p>
                        
                        <button type="submit" onClick={register_user}> Register </button>
                        {registro === true && <Navigate to={'/login'}/>}
                    </div>
                    <div className={Register.group}>
                        <p>
                            Ya tienes una cuenta?
                        <NavLink to="/login" > Inicia Sesion</NavLink>
                        </p>
                    </div>
                    
                </div>
                <div className={Register.imgForm}>
                    
                </div>
            </div>
        </div>
    )
}

export default Register;