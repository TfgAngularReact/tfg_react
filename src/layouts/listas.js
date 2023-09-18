import { useAuth } from "../context/authContext";
import * as React from 'react';
import { getDocument, getDocumentos} from "../services/fireStoreService";
import { useParams } from "react-router-dom";
import Resena from "../components/resena";
import { Grid, List } from "@mui/material"
import Lista from "../components/lista";


const Listas = () => {
    const { userData } = useAuth();
    const [listas, setListas] = React.useState()
    const [valor, setValor] = React.useState(0)

    
    const { uid } = useParams();




    React.useEffect(()=>{
        const fetchListas = async () => {
            const datos = await getDocumentos('Listas', '==', 'uid', uid);
            setListas(datos);
            console.log(datos);
        };
        
        fetchListas();
        
    },[])





    if (!listas || !userData) {
        return <div>Cargando...</div>; // Puedes mostrar un indicador de carga mientras se obtienen los datos
    }

    return(

        <div style={{marginTop: "2%", marginLeft:"2%"}}>
            {uid === userData.uid ? (
                <h6>TUS LISTAS</h6>
            ):(<h6>LISTAS DE {userData.nickname}</h6>)}

            <hr className="my-3" style={{marginLeft:"20px", marginRight:"20px", marginBottom:"-60px"}}/>
                <Grid container spacing={2}>
                    
                    {listas.map((object) => (
                            console.log("Lista",object),
                            <Grid item xs={6} md={4}>
                                    <Lista key={object.id} lista={object}></Lista>
                            </Grid>
                    ))}

                </Grid>
        </div>
        
    )
}
export default Listas