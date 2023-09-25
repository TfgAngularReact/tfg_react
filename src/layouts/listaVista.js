import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Juego from "../components/juego";
import { useAuth } from "../context/authContext";
import { getDocument, getDocumentos } from "../services/fireStoreService";


const ListaVista = (props) => {

    const { userData } = useAuth();
    const { idLista } = useParams();

    let list = null;
    const [juegos, setJuegos] = useState(null);
    const [lista, setLista] = useState(null);




    useEffect(() => {

        const fetchJuegos = async () => {
            const datos = await getDocumentos("Juegos", "in", "id", list.juegos)
            setJuegos(datos)
        };
        const fetchLista = async () => {
            list = await getDocument("Listas",idLista);
            setLista(list)
            if(list.juegos.length>0){
                fetchJuegos()
            }
        }

      if(idLista){
        fetchLista()
      }

      }, [idLista]);
    
    

    if (!lista) {
        return <div>Cargando...</div>; // Puedes mostrar un indicador de carga mientras se obtienen los datos
    }  

    return (
        <>
            <div style={{marginLeft:"2%", marginTop:"2%"}}>
                <h3>
                    {lista.name}
                </h3>
            </div>
            
            <div style={{display: "flex",  alignItems: "center", flexWrap: "wrap", flexDirection:"row", justifyContent:"space-evenly"}}>
                {
                    juegos ? 
                    (
                        <>
                            {juegos.map((documento) => (
                                <Juego key={documento.id} juego={documento}/>
                            ))}
                        </>

                    )
                    : 
                    (
                        <>
                        Añade algún juego!
                        </>
                    )
                }


            </div>
        </>
        
    )


}

export default ListaVista