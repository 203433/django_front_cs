import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            image_profile = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
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
                    document.getElementById('preview').src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                }
            }).catch((error) => {
                console.error("Error al obtener la imagen");
                document.getElementById('preview').src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
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
        if(lastNamePut === ""){
            lastNamePut = last_nameR;
        }
        if(firstNamePut === ""){
            lastNamePut = first_nameR;
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
        <div className={Profile.body}>
            <div className={Profile.profileContainer}>
                <div className={Profile.options}>
                    <button id="userTitle">User {user}</button>
                    <button className={Profile.backLogin} onClick={cerrar_sesion}>Logout</button>
                </div>
                
                <div className={Profile.profileImg}>
                    <div className={Profile.bordeImg}></div>
                    <img alt="error img" id="preview" />
                </div>
                <div className={Profile.image}>
                    <input accept="image/*" type="file" id="img"></input>
                    <button onClick={change_image}>Change Image</button>
                    <button onClick={delete_image}>Delete Image</button>
                </div>
                <div className={Profile.profileInfo}>
                    <div className={Profile.profileField}>
                        <p><b>First name: </b></p><input id="firstName"></input>
                    </div>
                    <div className={Profile.profileField}>
                        <p><b>Last name: </b></p><input id="lastName"></input>
                    </div>
                    <div className={Profile.profileField}>
                        <p><b>Username: </b></p><input id="username"></input>
                    </div>
                    <div className={Profile.profileField}>
                        <p><b>E-mail: </b></p><input id="email"></input>
                    </div>
                </div>
                <div className={Profile.update} onClick={change_profile}>
                    <button>
                        Change Profile
                    </button>
                </div>
                
                
            </div>
           
        </div>
    )
}

export default Profile;