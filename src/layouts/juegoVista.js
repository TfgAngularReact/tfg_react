import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";  
import { useAuth } from "../context/authContext";
import { getDocument, updateDocument } from "../services/fireStoreService";
import { Rating } from "react-simple-star-rating";

import AddResenaDialog from "../components/add-resena-dialog";
import AddListaDialog from "../components/add-lista-dialog";
import cargaTiempoService from "../services/cargaTiempoService";


const JuegoVista = () =>{
    const { idJuego } = useParams();
    const [juego, setJuego] = useState(null);
    const { userData } = useAuth();
    const { setUserData } = useAuth();
    const [openDialogResena, setOpenDialogResena] = useState(false);
    const [openDialogLista, setOpenDialogLista] = useState(false);




    useEffect(()=>{
        const componente = 'juego'; // Puedes usar un nombre único para identificar el componente
        cargaTiempoService.startTimer(componente);

        const cargaJuego = async () => {
            const datos = await getDocument('Juegos', idJuego);
            setJuego(datos);
        }
        cargaJuego();
        
        const tiempoCarga = cargaTiempoService.stopTimer(componente);
        console.log(`Tiempo de carga del componente <juego>: ${tiempoCarga} ms`);
    }, [])


    const Like = async () =>{
        if(!userData.likes.includes(juego.id)){
            const updateJuego = { ...juego }
            updateJuego.num_likes+=1

            const updatedState = { ...userData };
            updatedState.likes.push(juego.id);


            await updateDocument('Usuarios', updatedState, userData.uid)
            await updateDocument('Juegos', updateJuego, juego.id)
            
            setUserData(updatedState);
            setJuego(updateJuego)
            

        } else{
            console.log('Juego', juego)
            const updateJuego = { ...juego }
            updateJuego.num_likes-=1


            const elementoAEliminar = juego.id;
            const indice = userData.likes.indexOf(elementoAEliminar);
            const estadoActualizado = { ...userData };

            if (indice !== -1){
                estadoActualizado.likes.splice(indice, 1);
            }
           // console.log("USER", userData)

            await updateDocument('Usuarios', estadoActualizado, userData.uid)
            await updateDocument('Juegos', updateJuego, juego.id)
            setUserData(estadoActualizado);
            setJuego(updateJuego)


        }
    }  
    
    const jugado = async () =>{
        if(!userData.jugados.includes(juego.id)){
            const updatedState = { ...userData };
            updatedState.jugados.push(juego.id);
            console.log("USER", userData)
            console.log("Juego", juego)

            await updateDocument('Usuarios', updatedState, userData.uid)
            
            setUserData(updatedState);            

        } else{

            const elementoAEliminar = juego.id;
            const indice = userData.jugados.indexOf(elementoAEliminar);
            const estadoActualizado = { ...userData };

            if (indice !== -1){
                estadoActualizado.jugados.splice(indice, 1);
            }
            await updateDocument('Usuarios', estadoActualizado, userData.uid)
            setUserData(estadoActualizado);
        }
    }  


    const isLiked = () => {
        return userData.likes.includes(idJuego)
    }

    const isPlayed = () => {
        return userData.jugados.includes(idJuego)
    }

    const handleOpenDialogResena = () => {
        setOpenDialogResena(true);
      };
    
      const handleCloseDialogResena = () => {
        setOpenDialogResena(false);
      };

      const handleOpenDialogLista = () => {
        setOpenDialogLista(true);
      };
    
      const handleCloseDialogLista = () => {
        setOpenDialogLista(false);
      };



    if (!juego) {
        return (
            <div>
                Cargando...
            </div>
        )
    }

    return (
        <div style={{backgroundImage:`linear-gradient(0deg, rgb(36, 49, 77) 20%, rgba(36, 49, 77, 0.6)),url(${juego.portada})`, position: 'relative', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '100wh', height: '400px'}}>
           <div style={{marginLeft: '5%', marginRight:'5%', paddingTop: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-betwen'}}>
                <div style={{display:'flex', flexDirection:'column', marginRight:"50px"}}>
                    <h4>
                        {juego.nombre}
                    </h4>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Rating initialValue={juego.puntuacion} readonly={true} allowFraction>
                        </Rating>
                        {juego.puntuacion}
                    </div>
                    <p style={{textAlign:"justify"}}>
                       {juego.descripcion}
                    </p>
                </div>

                <div className="tarjeta card card-body" style={{width:"200px"}}>
                {userData && (
                        <>
                            {isLiked() ? 
                                <button className="btn" onClick={Like}>
                                    <i style={{color: "red"}} className="bi bi-check-circle-fill"></i>
                                </button>
                                :
                                <button className="btn" onClick={Like}>
                                    <i className="bi bi-check-circle"></i>
                                </button>
                            }
                            {isPlayed() ? 
                                <button className="btn" onClick={jugado}>
                                    <i style={{color: "red"}} className="bi bi-dpad-fill"></i>
                                </button>
                                :
                                <button className="btn" onClick={jugado}>
                                    <i className="bi bi-dpad"></i>
                                </button>
                            }

                            <div className="app">
                                <button onClick={handleOpenDialogResena} className="btn">
                                    <i className="bi bi-pencil-square"></i> Dejar una reseña
                                </button>
                                <AddResenaDialog open={openDialogResena} onClose={handleCloseDialogResena} data={juego} usuario={userData} />
                            </div>

                            <div className="app">
                                <button onClick={handleOpenDialogLista} className="btn">
                                    <i className="bi bi-card-checklist"></i> Añadir a una lista
                                </button>
                                <AddListaDialog open={openDialogLista} onClose={handleCloseDialogLista} data={juego} usuario={userData} />
                            </div>
                        </>
                        
                        
                    )}
                </div>

           </div>
      </div>
    )
}
export default JuegoVista