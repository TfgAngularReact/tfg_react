import { useAuth } from "../context/authContext";
import * as React from 'react';

import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/material";
import Jugados from "../components/jugados";
import JuegosLike from "../components/juegos-like";
import { getDocument } from "../services/fireStoreService";
import { useParams } from "react-router-dom";



const Juegos = () => {

    const { user } = useAuth();
    const  [userData, setUserData] = React.useState(null)
    
    const  [juegos, setJuegos] = React.useState({});

    const [value, setValue] = React.useState('1');
    
    const { uid } = useParams();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(()=>{
        const cargaUsuario = async () => {
            const datos = await getDocument('Usuarios', uid);
            setUserData(datos);
        }
        cargaUsuario();
    }, [])

    if (!userData) {
        return <div>Cargando...</div>; // Puedes mostrar un indicador de carga mientras se obtienen los datos
    }

    return(

        <div>
            {user.uid === userData.uid ? (
                <h6>TUS JUEGOS</h6>
            ):(<h6>JUEGOS DE {userData.nickname}</h6>)}
            
            <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example"  centered>
                    <Tab label="Jugados" value="1" />
                    <Tab label="Me gusta" value="2" />
                </TabList>
                </Box>
                <TabPanel value='1'>
                    <Jugados usuario={userData}></Jugados>
                </TabPanel>
                <TabPanel value='2'>
                    <JuegosLike usuario={userData}></JuegosLike>
                </TabPanel>
            </TabContext>
            </Box>
        </div>
    )
}
export default Juegos