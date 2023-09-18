import React, { useEffect, useRef, useState } from 'react';
import { getConsultaPaginada, getDocumentos } from '../services/fireStoreService';
import Juego from './juego';

const JuegosLike = (props) => {
    const [documentos, setDocumentos] = useState([]);
    const [ultimaDocumento, setUltimaDocumento] = useState(null);
    const [loading, setLoading] = useState(false);

    const listaRef = useRef(null);
    const { usuario } = props;

    useEffect( () => {
        const cargaDocs = async () =>{
            const datos = await getDocumentos('Juegos', 'in', 'id', usuario.likes);
            setDocumentos(datos);
        }
        if(usuario){
            cargaDocs();
        }
        
      }, [usuario]);
      
      if (!usuario) {
        return <div>Cargando...</div>; // Puedes mostrar un indicador de carga mientras se obtienen los datos
    }

    return (
        <div ref={listaRef} style={{display: "flex",  alignItems: "center", flexWrap: "wrap", flexDirection:"row", justifyContent:"space-evenly"}}>

            {documentos.map((documento) => (
                    <Juego key={documento.id} juego={documento}/>
                    ))}

        {loading && <p>Cargando...</p>}
        </div>
    )
}
export default JuegosLike