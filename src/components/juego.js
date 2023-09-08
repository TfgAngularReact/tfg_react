import { Link } from "react-router-dom";  

const Juego = (props) =>{
    const { juego } = props
    return (
        <Link to="/" key={juego.id} className="card tarjeta" style={{textDecoration: 'none', color: 'white'}}> 
            <img src={juego.portada} className="card-img-top" style={{maxWidth:'100%', maxHeight:'100%'}} />
            <div className="card-body cuerpo">
                <h6 className="card-title titulo">{juego.nombre}</h6>
            </div>
        </Link>
    )
}
export default Juego