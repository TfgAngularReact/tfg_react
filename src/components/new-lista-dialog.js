import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import '../styles/dialog.css';
import { createDoc, getId } from '../services/fireStoreService';
import { Timestamp } from 'firebase/firestore';

function NewListaDialog({ open, onClose, usuario, actualizarPadre }) {
    const [nombreLista, setNombreLista] = useState("");
    const [lista, setLista] = useState({id:getId() ,name:'',juegos:[], fechaCreacion:Timestamp.now(), uid: usuario.uid, num_likes:0})


    const handleNombreListaChange = (event) => {
        setNombreLista(event.target.value);
    };

    const guardarLista = async () => {
        const updateLista = {...lista}
        updateLista.name = nombreLista
        await createDoc('Listas', updateLista, lista.id);
        actualizarPadre()

    }

    const customDialogStyle = {
    width:'400px'
    };
    
    return (
        <Dialog open={open} onClose={onClose} >
          <DialogTitle className="dialogo">Crea una lista</DialogTitle>
          <DialogContent style={{display: 'flex', flexDirection:'column', alignItems:'center' }} className="dialogo" sx={customDialogStyle}>
            <input type="text" name="nombre" className="form-control" placeholder="Escribe un nombre" onChange={handleNombreListaChange}></input>
            <Button className='mt-2' onClick={guardarLista}  color="primary">
                CREAR
            </Button>
          </DialogContent>
          <DialogActions className="dialogo">
            <Button onClick={onClose} color="error">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      );

}

export default NewListaDialog