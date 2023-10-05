import { useAuth } from "../context/authContext";
import * as React from 'react';
import { getDocument, getDocumentos} from "../services/fireStoreService";
import { useParams } from "react-router-dom";
import Resena from "../components/resena";
import { Grid } from "@mui/material"


const Resenas = () => {
    const { user } = useAuth();
    const  [userData, setUserData] = React.useState()
    const [resenas, setResenas] = React.useState()
    const [valor, setValor] = React.useState(0)

    
    const { uid } = useParams();


    React.useEffect(()=>{

        const cargaUsuario = async () => {
            const datos = await getDocument('Usuarios', uid);
            setUserData(datos);
        }

        cargaUsuario();

    }, [])

    React.useEffect(()=>{
        const fetchResenas = async () => {
            const datos = await getDocumentos('Resenas', '==', 'usuario', userData.uid);
            setResenas(datos);
            console.log(datos);
        };
        if(userData){
            fetchResenas();
        }
    },[userData])



    const actualizaValor = () => {
        setValor(valor+1)
    }

    if (!userData || !resenas) {
        return <div>Cargando...</div>; // Puedes mostrar un indicador de carga mientras se obtienen los datos
    }

    return(

        <div style={{marginTop: "2%", marginLeft:"2%"}}>
            {user.uid === userData.uid ? (
                <h6>TUS RESEÑAS</h6>
            ):(<h6>RESEÑAS DE {userData.nickname}</h6>)}

                <Grid container spacing={2}>
                    {resenas.map((resena) => (
                            <Grid key={resena.id} item xs={12} md={4}>
                                    <Resena  parametro={resena} actualizarPadre={actualizaValor}></Resena>
                            </Grid>
                    ))}

                </Grid>
        </div>
        
    )
}
export default Resenas