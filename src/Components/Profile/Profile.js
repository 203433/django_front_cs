import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Profile.scss';
import { Figure, Button, ButtonGroup, Form } from 'react-bootstrap';

function Profile() {

    let token = localStorage.getItem('token');
    let user = localStorage.getItem('id_user');
    let image_profile = "";
    let usernameR, first_nameR,last_nameR,emailR;
    
    const change_image = () => {
        let postData = new FormData();
        postData.append('id_user', user);
        postData.append('url_img', document.getElementById('img').files[0]);

        axios.post("http://localhost:8000/api/v1/user/profile", postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
                console.log(response.data);
                image_profile = "http://localhost:8000" + response.data.url_img;
                console.log(image_profile);
                document.getElementById('preview').src = image_profile;
                window.location.reload();
            }).catch((error) => {
                console.log(error.response.data);
                if (error.response.data === "Metodo post no permitido") {
                    console.log("Enviar a un metodo put");
                    put_image();
                }
            })
    }

    let put_image = () => {
        let putData = new FormData();
        putData.append('url_img', document.getElementById('img').files[0]);

        axios.put("http://localhost:8000/api/v1/user/perfil/" + user + "/", putData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
            console.log(response.data);
            image_profile = "http://localhost:8000" + response.data.url_img;
            document.getElementById('preview').src = image_profile;
            window.location.reload();
        }).catch((error) => {
            console.log(error.response.data);
            alert("No se pudo actualizar la imagen");
        });
    }

    let delete_image = () => {
        axios.delete("http://localhost:8000/api/v1/user/perfil/" + user + "/", {
            headers: {
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            console.log(response.data);
            alert("Imagen eliminada");
            image_profile = "https://www.optimview.com/sites/default/files/team/icono_persona.png";
            document.getElementById('preview').url = image_profile;
            window.location.reload();
        });
    }

    window.onload = function visualize_data() {
        axios.get("http://localhost:8000/api/v1/user/perfil/" + user + "/", {
            headers: {
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
                console.log(response.data);
                if(response.data.url_img != null){
                    image_profile = "http://localhost:8000" + response.data.url_img;
                    document.getElementById('preview').src = image_profile;
                }else{
                    document.getElementById('preview').src = "https://www.optimview.com/sites/default/files/team/icono_persona.png";
                }
            }).catch((error) => {
                console.error("Error al obtener la imagen");
                document.getElementById('preview').src = "https://www.optimview.com/sites/default/files/team/icono_persona.png";
            });

        axios.get("http://localhost:8000/api/v1/user/data/"+user+"/",{
            headers:{
                'Authorization': 'Token ' + token,
            },
        }).then((response) =>{
            usernameR = response.data.username;
            first_nameR = response.data.first_name;
            last_nameR = response.data.last_name;
            emailR = response.data.email;

            document.getElementById("firstName").placeholder = first_nameR;
            document.getElementById("lastName").placeholder = last_nameR;
            document.getElementById("email").placeholder = emailR;
            document.getElementById("username").placeholder = usernameR;
        }).catch((error)=>{
            console.log(error.response.data);
        })
    }

    let change_profile = () =>{
        let putData = new FormData();
        let usernamePut = document.getElementById("username").value;
        let lastNamePut = document.getElementById("lastName").value;
        let firstNamePut = document.getElementById("firstName").value;
        let emailPut = document.getElementById("email").value;

        if(usernamePut === ""){
            usernamePut = usernameR; 
        }
        if(firstNamePut === ""){
            firstNamePut = first_nameR;
        }
        if(lastNamePut === ""){
            lastNamePut = last_nameR;
        }
        if(emailPut === ""){
            emailPut = emailR;
        }
        putData.append("first_name",firstNamePut);
        putData.append("last_name",lastNamePut);
        putData.append("username",usernamePut);
        putData.append("email",emailPut);

        axios.put("http://localhost:8000/api/v1/user/data/"+user+"/",putData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            console.log(response.data);
            window.location.reload();
        }).catch((error)=>{
            alert("No se pudieron actualizar los datos");
            console.log(error.response.data);
        })
    }

    const navigate = useNavigate();
    let cerrar_sesion = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div>
                <div >
                    <Form className="px-14  "> 
                    <Form.Group className="text-center"    >
                    <Figure className="mt-3">
                    <Figure.Image
                        width={300}
                        height={300}
                        alt="error img"
                        id="preview"
                        roundedCircle = "true"
                    />
                    <Figure.Caption>
                        Holla Out
                    </Figure.Caption>
                </Figure>
                    </Form.Group>
                    <Form.Group className="text-center"    >
                    <Form.Control accept="image/*" type="file" id="img"></Form.Control>
                    


                    </Form.Group  >

                    <Form.Group className="text-center mt-2"    >
                    <ButtonGroup >    
                    <Button onClick={change_image}   >Change Image</Button>
                    <Button onClick={delete_image}   >Delete Image</Button>
                    </ButtonGroup>    
                    </Form.Group>

                    <Form.Group className="text-center mt-2"    >
   
                        <Form.Label className="fw-bold">First name:</Form.Label>
                        <Form.Control type="text" className="text-center" id="firstName"   />
                    </Form.Group>
                    <Form.Group className="text-center"    >
                        <Form.Label className="fw-bold">Last name:</Form.Label>
                        <Form.Control type="text" className="text-center" id="lastName"   />
                    </Form.Group>
                    <Form.Group className="text-center"    >
                        <Form.Label className="fw-bold">Username: </Form.Label>
                        <Form.Control type="text" className="text-center" id="username"   />
                    </Form.Group >
                    <Form.Group className="text-center mb-2"    >
                        <Form.Label className="fw-bold">E-mail: </Form.Label>
                        <Form.Control type="text" className="text-center" id="email"   />
                    </Form.Group>
                    <Form.Group className="text-center"    >
                <div  onClick={change_profile}>
                    <Button className=" mb-2"  >
                        Change Profile
                    </Button>
                </div>
                <div >
                    <Button  onClick={cerrar_sesion}>Logout</Button>
                </div>
                    </Form.Group>
                </Form>
                </div>


        </div>
    )
}

export default Profile;