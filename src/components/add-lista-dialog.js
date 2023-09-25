import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import '../styles/dialog.css';
import TextField from '@mui/material/TextField';
import { getDocumentos, getId, updateDocument } from '../services/fireStoreService';

import { Checkbox, FormControlLabel } from '@mui/material';


function AddListaDialog({ open, onClose, data, usuario }) {

    const [listas, setListas] = useState(null)
    
    useEffect(()=>{
        cargaListas()
    }, [])

    const cargaListas = async () => {
        const datos = await getDocumentos('Listas', '==', 'uid', usuario.uid)
        console.log(datos);
        setListas(datos)
    }
    
    const checkedItems = (item) => {
        if(item.juegos.includes(data.id)){
            return true
        }
        else{
            return false
        }
    }

    const handleCheckboxChange = async (event, item) => {
        console.log("EVENTO",event.target.checked, item);
        if(event.target.checked) {
            item.juegos.push(data.id)
            await updateDocument('Listas', item, item.id)
            cargaListas()
        } else {
            const index = item.juegos.indexOf(data.id);
            if (index !== -1) {
              item.juegos.splice(index, 1);
            }
            await updateDocument('Listas', item, item.id)
            cargaListas()

        }
    }

    const customDialogStyle = {
        width:'400px'
      };



  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle className="dialogo">Selecciona una lista</DialogTitle>
      <DialogContent style={{display: 'flex', flexDirection:'column', alignItems:'center' }} className="dialogo" sx={customDialogStyle}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {listas && (
                <>
                    {listas.map((item) => (
                    <FormControlLabel
                        key={item.id}
                        control={
                        <Checkbox
                            checked={checkedItems(item)}
                            onChange={(event) => handleCheckboxChange(event, item)}
                            color="primary"
                        />
                        }
                        label={item.name}
                    />
                    ))}
                </>
                
            )}

            </div>

      </DialogContent>
      <DialogActions className="dialogo">
        <Button onClick={onClose} color="error">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddListaDialog;
