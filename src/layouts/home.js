import { useEffect, useState } from "react"
import { getJuegosNuevos, getResenasPopulares } from "../services/fireStoreService";
import Juego from '../components/juego';

import '../styles/home.css';
import Resena from "../components/resena";



const Home = () => {
    const [juegos, setJuegos] = useState([])
    const [resenas, setResenas] = useState([])
    const [valor, setValor] = useState(0)

    let mounted = false

    const fetchJuegos = async () => {
        const nuevosJuegos = await getJuegosNuevos();
        setJuegos(nuevosJuegos);
        mounted = true

    };
    const fetchResenas = async () => {
        const resenasPopulares = await getResenasPopulares();
        setResenas(resenasPopulares);
        console.log(resenasPopulares);
    };


    useEffect(() => {
        if (!mounted) {
            fetchJuegos();
        }
        fetchResenas();
    }, [valor]);

    const actualizaValor = () => {
        setValor(valor+1)
    }
    return(
        <div>
            <h2>
                NOVEDADES
            </h2>
            <hr className="my-3" />

            <div className="contenedor-juegos">
                {juegos.map((juego)=>(
                    <Juego key={juego.id} juego={juego}/>
                ))}
                
            </div>

            <h2>
                RESEÑAS POPULARES
            </h2>
            <hr className="my-3" />

            <div className="contenedor-juegos">
                {resenas.map((parametro)=>(
                    console.log("Reseñas id",parametro.id),
                    <Resena key={parametro.id} parametro={parametro} actualizarPadre={actualizaValor}/>
                ))}
                
            </div>
        </div>

    )
}

export default Home