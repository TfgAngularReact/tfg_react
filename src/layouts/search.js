import { doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Juego from "../components/juego"
import { getCollection, getDocumentos } from "../services/fireStoreService"

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

        <div style={{display: "flex",  alignItems: "center", flexWrap: "wrap", flexDirection:"row", justifyContent:"space-evenly"}}>

            {resultados.map((documento) => (
                    <Juego key={documento.id} juego={documento}/>
                    ))}

        </div>
    </div>
)
}

export default Search