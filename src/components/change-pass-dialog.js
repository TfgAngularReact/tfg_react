import { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import '../styles/dialog.css';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { getAuth, updatePassword } from 'firebase/auth';


const ChangePassDialog = ({ open, onClose, usuario }) => {

    const auth = getAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();



    const password = watch('pass'); 

    const onSubmit = (data) => {

        updatePassword(usuario, data.pass)
        .then(() => {
            console.log("Contraseña cambiada con éxito");
        })
        .catch((error) => {
            console.error("Error al cambiar la contraseña:", error);
        });
        
      };

      
    const customDialogStyle = {
        width:'400px'
      };



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="dialogo">Escribe una nueva contraseña</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="dialogo" sx={customDialogStyle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Controller
              name="pass"
              control={control}
              rules={{
                required: 'Campo requerido',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              }}
              render={({ field }) => (
                <>
                  <input
                  type="password" id="pass" name="pass" className="form-control" placeholder="Contraseña" {...field} />
                  {errors.pass && <div className="error">{errors.pass.message}</div>}
                </>
              )}
            />
            <Controller
              name="repitPass"
              control={control}
              rules={{
                required: 'Campo requerido',
                validate: (value) => value === password || 'Las contraseñas no coinciden '+password,
              }}
              render={({ field }) => (
                <>
                  <input type="password" name="repitPass" className="form-control mt-4" placeholder="Repetir contraseña" {...field} />
                  {errors.repitPass && <div className="error">{errors.repitPass.message}</div>}
                </>
              )}
            />
            <button type="submit" className="mt-4 btn btn-primary">Guardar</button>
          </div>
        </form>
      </DialogContent>
      <DialogActions className="dialogo">
        <Button onClick={onClose} color="error">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );

}

export default ChangePassDialog