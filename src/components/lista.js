
import { useEffect, useState } from "react";
import {  useNavigate  } from "react-router-dom";  
import { useAuth } from "../context/authContext";
import { getDocumentos } from "../services/fireStoreService";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/lista.css';

const Lista = (props) =>{

    const { userData } = useAuth();
    const { lista } = props;
    const [juegos, setJuegos] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {

      
        const fetchJuegos = async () => {
            const datos = await getDocumentos("Juegos", "in", "id", lista.juegos)
            setJuegos(datos.slice(0, 5))
        };

      if(lista){
        fetchJuegos()
      }

      }, [lista]);
    
    

    if (!lista || !juegos) {
        return <div>Cargando...</div>; // Puedes mostrar un indicador de carga mientras se obtienen los datos
    }  

    const handleClick = () => {
        navigate(`/lista/${lista.id}`);
      };


    return (
        <div className="card cardbody lista" onClick={handleClick} style={{display:"flex", flexDirection:"column", padding:"10px"}}>
            <div  style={{display:"flex", flexDirection:"row"}}>
                {juegos.map((item, i) => (
                <div
                    key={i}
                    style={{
                    maxWidth: '120px',
                    maxHeight: '92px',
                    boxShadow: '2px 2px 4px 0 rgba(20, 20, 20, 0.3)',
                    }}
                    className={`clase${(i % 5) + 1}`}
                >
                    <img
                    style={{ border: '1px solid #000' }}
                    className="imagen-juegos"
                    src={item.portada}
                    alt=""
                    />
                </div>
                ))}
            </div>
                <div className="card-footer" style={{color:"white"}}>
                    {lista.name}
                </div>
        </div>
    )


}
export default Lista