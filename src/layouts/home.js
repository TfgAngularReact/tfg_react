import { useEffect, useState } from "react"
import { getJuegosNuevos, getResenasPopulares } from "../services/fireStoreService";
import Juego from '../components/juego';
import { Grid } from "@mui/material"

import '../styles/home.css';
import Resena from "../components/resena";
import cargaTiempoService from "../services/cargaTiempoService";



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
        // Inicia el temporizador al comienzo de la función
        const inicio = performance.now();
      
        try {
          const resenasPopulares = await getResenasPopulares();
          setResenas(resenasPopulares);
      
          // Detiene el temporizador al final de la función
          const fin = performance.now();
      
          // Calcula el tiempo total de ejecución
          const tiempoTotal = fin - inicio;
      
          // Devuelve el tiempo total o realiza cualquier otra acción deseada
          return tiempoTotal;
        } catch (error) {
          // Maneja errores si es necesario
          throw error;
        }
      };


    useEffect(() => {

        const componente = 'home'; // Puedes usar un nombre único para identificar el componente
        cargaTiempoService.startTimer(componente);
    
        if (!mounted) {
            fetchJuegos();
        }
        fetchResenas().then(tiempoTotal => {
            console.log(`La función se ejecutó en ${tiempoTotal} ms`);
          })
          .catch(error => {
            console.error('Ocurrió un error:', error);
          });;

        const tiempoCarga = cargaTiempoService.stopTimer(componente);
        console.log(`Tiempo de carga del componente <Home>: ${tiempoCarga} ms`);
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
                <Grid container spacing={2}>
                    {resenas.map((resena) => (
                            <Grid key={resena.id} item xs={12} md={6}>
                                    <Resena  parametro={resena} actualizarPadre={actualizaValor}></Resena>
                            </Grid>
                    ))}

                </Grid>
                
            </div>
        </div>

    )
}

export default Home