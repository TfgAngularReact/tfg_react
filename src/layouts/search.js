import { doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Juego from "../components/juego"
import { getCollection, getDocumentos } from "../services/fireStoreService"
import '../styles/home.css';
import { Grid } from "@mui/material"


const Search = () => {

    const {texto} = useParams()
    const [resultados, setResultados] = useState(null)

    useEffect(() => {
        const fetchJuegos = async () =>{
            let filtrados = []
            const datos = await getCollection("Juegos")
            datos.forEach(doc => {
                const data = doc.data();
                if(data.nombre.toLowerCase().includes(texto.toLowerCase())){
                    filtrados.push(data)
                }
            });
            setResultados(filtrados)

        }
        if(texto){
            fetchJuegos()
        }

    }, [texto])
    if(!resultados){
        return(
            <>Cargando...</>
        )
    }

return(
    <div style={{marginLeft:"5%", margintTop:"3%"}}>
        <h4>Resultados para: {texto}</h4>

        <div className="contenedor-juegos"s>

        <Grid container spacing={2}>
                {resultados.map((documento) => (
                    <Grid key={documento.id} item xs={12} md={3}>
                        <Juego  juego={documento}/>
                    </Grid>
                    ))}

                </Grid>


        </div>
    </div>
)
}

export default Search