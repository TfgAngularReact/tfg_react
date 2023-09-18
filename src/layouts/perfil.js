import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { auth } from "../config/firebase"
import { useAuth } from "../context/authContext"
import { getDocumentos } from "../services/fireStoreService"
import '../styles/perfil.css';
import { Link } from "react-router-dom";  
import { Grid } from "@mui/material"
import Lista from "../components/lista"
import Resena from "../components/resena"
import NewListaDialog from "../components/new-lista-dialog"


const Perfil = ({setUser}) => {
    const navigate = useNavigate()
    const {userData} = useAuth()
    const [resenas, setResenas] = useState(null);
    const [listas, setListas] = useState(null);
    const { uid } = useParams();
    const [valor, setValor] = useState(0)
    const [openDialogNewLista, setOpenDialogNewLista] = useState(false);


    const handleLogout = async () => {
        await signOut(auth)
        setUser(null)
        navigate("/")
    }

    useEffect(()=>{
        const cargaResenas = async () =>{
            const datos  = await getDocumentos("Resenas", "==", "usuario", userData.uid)
            setResenas(datos)
        }
        const cargaListas = async () =>{
            const datos  = await getDocumentos("Listas", "==", "uid", userData.uid)
            setListas(datos)
        }
        if(userData){
            cargaResenas()
            cargaListas()
        }
    }, [userData, valor]) 

    const isYourUser = () =>{
        if(uid === userData.uid){
            return true
        }
        else{return false}
    }

    const actualizaValor = () => {
        setValor(valor+1)
    }

    const handleOpenDialogNewLista = () => {
        setOpenDialogNewLista(true);
      };

    const handleCloseDialogNewLista = () => {
    setOpenDialogNewLista(false);
    };


    if(!userData || !resenas || !listas){
        return(
            <div>
                Cargando...
            </div>
        )
    }
    return(
        <div className="content-wrap" style={{display:"flex", flexDirection: "column"}}>

            <div style={{display:"flex", flexDirection: "row"}}>
                <div className="info-usuario" style={{width:"70%", display:"flex", flexDirection: "row"}}>
                    <div className="img-perfil">
                        <img src={userData.img_perfil} alt="" className="img-perfil"/> 
                    </div>
                    <div  style={{display:"flex", flexDirection: "column"}}>
                        {userData.nickname}
                        {isYourUser() ?
                            <>
                                <button onClick={handleLogout}>
                                    EDITAR PERFIL
                                </button>     
                                <button onClick={handleLogout}>
                                    salir
                                </button>
                            </>
                            :
                            <></>
                            }
                    </div>
                </div>
                <div className="estadisticas" style={{display:"flex", flexDirection: "row"}}>
                    <Link to={`/juegos/${userData.uid}`}>
                        <div  style={{marginRight:"30px"}} className="num-estadisticas">
                            <p>{userData.jugados.length}</p>
                            <p>JUGADOS</p>
                        </div>
                    </Link>

                    <Link to={`/listas/${userData.uid}` }>
                        <div style={{marginRight:"30px"}} className="num-estadisticas">
                            <p>{listas.length}</p>
                            <p>LISTAS</p>
                        </div>
                    </Link>

                    <Link to={`/resenas/${userData.uid}` }>
                        <div className="num-estadisticas">
                            <p>{resenas.length}</p>
                            <p>RESEÑAS</p>
                        </div>
                    </Link>
                </div>

            </div>

            <div>
                <div>
                    <h6 style={{marginLeft: "2%", marginTop:"5%"}}>
                        LISTAS
                    </h6>
                    <button onClick={handleOpenDialogNewLista} className="btn">
                            <i class="bi bi-plus-circle"></i>Crear una lista
                    </button>
                    <NewListaDialog open={openDialogNewLista} onClose={handleCloseDialogNewLista} usuario={userData} />
                </div>
                
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

            <div>
                <h6 style={{marginLeft: "2%", marginTop:"5%"}}>
                    RESEÑAS
                </h6>
                <hr className="my-3" style={{marginLeft:"20px", marginRight:"20px", marginBottom:"-60px"}}/>
                <Grid container spacing={2}>
                    {resenas.map((resena) => (
                            console.log("RESEÑA",resena),
                            <Grid item xs={12} md={6}>
                                    <Resena key={resena.id} parametro={resena} actualizarPadre={actualizaValor}></Resena>
                            </Grid>
                    ))}

                </Grid>
            </div>

        </div>
    )
}
export default Perfil