import { setUserId } from "firebase/analytics";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { getDocument } from "../services/fireStoreService";


export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

 export function AuthProvider({children}){
    
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("BBBBBBBB")
        onAuthStateChanged(auth, async currentUser =>{
            if(currentUser !== null){
                const data = await getDocument('Usuarios', currentUser.uid)
                setUser(currentUser)
                setUserData(data)
                setLoading(false)
            }
            else{
                setLoading(false)
            }

        })
    }, [])

    return (
        <authContext.Provider value={{user, userData, setUserData}}>
            {loading ? (
                <p>Cargando...</p>
            ):(
                children
            )}
        </authContext.Provider>
    )
}