import React, { useState } from "react"
import { db } from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { createDoc } from "../services/fireStoreService";
import { Timestamp, query, getDocs, where, collection } from 'firebase/firestore'; 
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";





const checkIfUsernameExists = async (username) => {

    try {
        const usernameRef = collection(db,'Usuarios');
        const q = query(usernameRef, where('nickname', '==', username));
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.empty) {
            console.log('false');
            return false;

      } else {
            return true;
      }
    } catch (error) {
        console.error('Error al comprobar el nickname:', error);
        return false;
    }
  };


const Registro = () => {

    let registrarUsuario = {
        email: "",
        nickname: "",
        uid: "",
        likes: [],
        listas_like: [],
        fechaRegistro: Timestamp.now(),
        listas: [],
        reseñas: [],
        jugados: [],
        seguidos: [],
        seguidores: [],
        img_perfil: "",
        resenas_like: [],
        bio: ""
      }; 
      const [formData, setFormData] = useState({
        email: "",
        nickname: "",
        password: "",
        repeatPassword: ""
      });

    const navigate = useNavigate()

    const handleChange = ({target: {name, value}}) => {
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.repeatPassword){
            alert('Las constraseñas no coinciden');
            return;
        }
        try{
            if(await checkIfUsernameExists(formData.nickname)){
                alert('El nombre de usuario no está disponible')
            }
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const userUid = userCredential.user.uid;

            console.log(formData);

            registrarUsuario.email = formData.email
            registrarUsuario.nickname = formData.nickname
            registrarUsuario.uid = userUid
            
            
             // Aquí usar la función para guardar el usuario en la colección
            await createDoc('/Usuarios', registrarUsuario, userUid);
            navigate('/')

        } catch (error) {
            alert('Error al registrar el usuario: ' + error.message);
          }

    }

    return(
        <div className='wrapper'>
            <div className="row">
                    <div className="padre">
                        <div className="formulario card card-body">
                                <h2>Registrarse</h2>
                            <form className="form-register" style={{alignItems:"center", display: "inline-flex", flexDirection: "column", alignContent: "center"}} onSubmit={handleSubmit}>
                                <input type="text" name="email" className="form-control" placeholder="Email" onChange={handleChange}></input>
                                <input type="text" name="nickname" className="form-control mt-4" placeholder="Usuario" onChange={handleChange}></input>
                                <input type="password" name="password" className="form-control mt-4" placeholder="Contraseña" onChange={handleChange}></input>
                                <input type="password" name="repeatPassword" className="form-control mt-4" placeholder="Repetir Contraseña" onChange={handleChange}></input>
                                <button type="submit" className="mt-4 btn btn-primary">Aceptar</button>
                            </form>
                        </div>

                    </div>

            </div>
        </div>
    )
}

export default Registro