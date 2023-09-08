import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import {auth} from "../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"


const Login = () => {

      const [formData, setFormData] = useState({
        email: "",
        password: "",   
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

        try{

            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const userUid = userCredential.user.uid;

        
            navigate('/')

        } catch (error) {
            alert('Error al hacer login: ' + error.message);
          }

    }
    return(
        <div className='wrapper'>
            <div className="row">
                    <div className="padre">
                        <div className="tarjeta card card-body">
                                <h2>Bienvenido</h2>
                            <form className="form-register" onSubmit={handleSubmit}>
                                <input type="text" name="email" className="form-control" placeholder="Email" onChange={handleChange}></input>
                                <input type="password" name="password" className="form-control mt-4" placeholder="Contraseña" onChange={handleChange}></input>
                                <button type="submit" className="mt-4 btn btn-primary">Aceptar</button>
                            </form>
                        </div>

                    </div>

            </div>
        </div>
    )
}

export default Login