import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"

const Perfil = ({setUser}) => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        await signOut(auth)
        setUser(null)
        navigate("/")
    }
    return(
        <div>
            <h1>View Perfil</h1>
            <button onClick={handleLogout}>
                salir
            </button>
        </div>
    )
}
export default Perfil