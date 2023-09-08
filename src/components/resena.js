
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";  
import { useAuth } from "../context/authContext";
import { getDocument, updateDocument } from "../services/fireStoreService";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/resena.css';
import { Rating } from "react-simple-star-rating";

const Resena = ({parametro, actualizarPadre}) =>{

    const [usuario, setUsuario] = useState();
    const [juego, setJuego] = useState();
    const [resena, setResena] = useState(parametro);
    const { userData } = useAuth();
    const { setUserData } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const fetchUsuario = async () => {
            console.log("AAAA");
            console.log("Carga reseña",parametro)
            const user = await getDocument('Usuarios', parametro.usuario);
            if (isMounted) {
                setUsuario(user);
            }
        };
      
        const fetchJuego = async () => {
            const game = await getDocument('Juegos', parametro.id_juego);
            if (isMounted) {
                setJuego(game);
            }
        };
      
        if (isMounted) {
            fetchUsuario();
            fetchJuego();
        }
      
        return () => {
            isMounted = false; // Evitar que las actualizaciones posteriores afecten
        };
      }, [resena]);
      

    if (!usuario || !juego) {
        return <div>Cargando...</div>; // Puedes mostrar un indicador de carga mientras se obtienen los datos
    }

    const Like = async () =>{
        if(!userData.resenas_like.includes(resena.id)){
            const updateResena = { ...resena }
            updateResena.num_likes+=1

            const updatedState = { ...userData };
            updatedState.resenas_like.push(resena.id);
            console.log("USER", userData)
            console.log("Reseña", resena)

            await updateDocument('Usuarios', updatedState, userData.uid)
            await updateDocument('Resenas', updateResena, resena.id)
            
            setUserData(updatedState);
            setResena(updateResena)
            actualizarPadre()
            

        } else{
            console.log('RESEÑA', resena)
            const updateResena = { ...resena }
            updateResena.num_likes-=1


            const elementoAEliminar = resena.id;
            const indice = usuario.resenas_like.indexOf(elementoAEliminar);
            const estadoActualizado = { ...userData };

            if (indice !== -1){
                estadoActualizado.resenas_like.splice(indice, 1);
            }
           // console.log("USER", userData)

            await updateDocument('Usuarios', estadoActualizado, userData.uid)
            await updateDocument('Resenas', updateResena, resena.id)
            setUserData(estadoActualizado);
            setResena(updateResena)
            actualizarPadre()


        }
    }     

    const isLiked = () => {
        if(userData.resenas_like.length < 3){
           // console.log(userData)
        }
        //console.log(userData.resenas_like.includes(resena.id), userData.resenas_like.length)
        return userData.resenas_like.includes(resena.id)
    }


    return (
            <div className="tarjeta card card-body">
                <div className="cabecera">
                    <div className="imagen-resena">
                        <img src={juego.portada} alt="" className="imagen-resena"/>
                    </div>
                    <h3>
                        <Link  style={{textDecoration: 'none'}}>
                            {juego.nombre}
                        </Link>
                    </h3>
                </div>
                <div>
                    <Rating initialValue={resena.puntuacion} readonly={true} allowFraction={true}>
                    </Rating>
                </div>
                <div className="cuerpo">
                    <p className="shadow-none">
                        {resena.texto}
                    </p>
                </div>
                <div className="card-footer">
                    <div className="pefil">
                        <div className="foto-perfil">
                            <img src={usuario.img_perfil} alt=""/>
                        </div>
                        <p className="usuario">
                            <Link style={{textDecoration: 'none'}}>
                                <strong >
                                    {usuario.nickname}
                                </strong>
                            </Link>
                        </p>
                    </div>
                    {isLiked() ? 
                    <>
                        <button className="btn" onClick={Like}>
                            <i style={{color: "red"}} className="bi bi-heart-fill"></i>
                        </button>
                    </>
                    :
                    <>
                        <button className="btn" onClick={Like}>
                            <i className="bi bi-heart"></i>
                        </button>
                    </>
                    }



                </div>
            </div>
    )
}
export default Resena