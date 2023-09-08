import { useAuth } from "../context/authContext";
import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Juegos = () => {

    const { user } = useAuth();
    const { userData } = useAuth();

    const [value, setValue] = React.useState(2);
    
    const handleChange = (newValue) => {
        setValue(newValue);
    };


    return(

        <div>
            {user.uid === userData.uid ? (
                <h6>TUS JUEGOS</h6>
            ):(<h6>JUEGOS DE {userData.nickname}</h6>)}
            
            <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
                <Tab label="Active" />
                <Tab label="Active" />
            </Tabs>
        </div>
    )
}
export default Juegos