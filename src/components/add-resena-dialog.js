import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import '../styles/dialog.css';
import TextField from '@mui/material/TextField';

import { Rating } from "react-simple-star-rating";
import { createDoc, getDocumentos, getId, updateDocument } from '../services/fireStoreService';
import { Timestamp } from 'firebase/firestore';


function AddResenaDialog({ open, onClose, data, usuario }) {

    const [rating, setRating] = useState(0)
    const [resenaTexto, setResenaTexto] = useState(''); // Estado para almacenar el texto de la reseña
    const [resena, setResena] = useState( {id:getId() ,name:'', id_juego:data.id, fechaCreacion:Timestamp.now(), texto:'', usuario: usuario.uid, num_likes:0, puntuacion:0})

    const handleResenaTextoChange = (event) => {
        setResenaTexto(event.target.value);
      };

    const handleRating = (rate) => {
        setRating(rate)
      }

    const customDialogStyle = {
        width:'400px'
      };

    const guardarResena = async () =>{
        const updateResena = { ...resena }
        updateResena.texto = resenaTexto
        updateResena.puntuacion = rating

        await createDoc('Resenas', updateResena, resena.id);

        const resenasByjuego = await getDocumentos('Resenas', '==', 'id_juego', data.id);


        let suma = 0;
        let num_resenas = resenasByjuego.length;
        for (let i = 0; i< resenasByjuego.length; i++){
          suma = suma+resenasByjuego[i].puntuacion;
          }
        let media= Number((suma/num_resenas).toFixed(1));
        data.puntuacion = media
        await updateDocument('Juegos', data, data.id);


    }

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle className="dialogo">Escribe una reseña</DialogTitle>
      <DialogContent style={{display: 'flex', flexDirection:'column', alignItems:'center' }} className="dialogo" sx={customDialogStyle}>
        <Rating onClick={handleRating} initialValue={rating} allowFraction ></Rating>
        <TextField className='mt-2' id="outlined-multiline-static" label="Escribe tu reseña..." multiline rows={4} InputProps={{style: {width:'300px', color:'white'}}}
            onChange={handleResenaTextoChange} // Manejar cambios en el TextField

        />
        <Button className='mt-2' onClick={guardarResena}  color="primary">
            GUARDAR
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

export default AddResenaDialog;
