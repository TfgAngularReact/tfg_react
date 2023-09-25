import { useEffect, useRef, useState } from "react"
import ChangePassDialog from "../components/change-pass-dialog"
import { useAuth } from "../context/authContext"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../config/firebase";
import { updateDocument } from "../services/fireStoreService";


const Settings = () => {


    const { userData } = useAuth()
    const { user } = useAuth()
    const { setUserData } = useAuth()

    const [openDialogChangePass, setOpenDialogChangePass] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);



    const handleChange = () => {

    }
    const handleSubmit = () => {

    }

    useEffect(() => {
        // Cuando la fuente de la imagen cambie, forzar una actualización del componente
      }, [userData]);

    const handleAutoUpload = async () => {
        try {
          const selectedFile = fileInputRef.current.files[0];
    
          if (!selectedFile) {
            alert('No se ha seleccionado ningún archivo.');
            return;
          }
    
          // Crear una referencia al archivo en Firebase Storage
          const storageRef = ref(storage, 'Imagenes/' + selectedFile.name);
    
          // Cargar el archivo a Firebase Storage
          await uploadBytes(storageRef, selectedFile);
    
          // Obtener el enlace a la imagen cargada
          const downloadURL = await getDownloadURL(storageRef);
    
          // Guardar el enlace en Firebase Firestore u otro lugar
          let usuario = userData
          usuario.img_perfil = downloadURL
          setUserData(usuario)
        updateDocument("Usuarios", usuario, usuario.uid)
    
          alert('La imagen se cargó con éxito.');
        } catch (error) {
          console.error('Error al cargar la imagen:', error);
          alert('Ocurrió un error al cargar la imagen.');
        }
      };

    const handleOpenDialogChangePass = () => {
        setOpenDialogChangePass(true);
    };

    const handleCloseDialogChangePass = () => {
        setOpenDialogChangePass(false);
    };

return(
    <div className='wrapper'>
        <div className="row">
                <div className="padre">
                    <div className="formulario card card-body">
                            <div className="img-perfil">
                            <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleAutoUpload} />
                               <button type="button" onClick={() => fileInputRef.current.click()} className="image-button" style={{border:"none", backgroundColor: "transparent", padding:"0"}}>
                                    <img src={userData.img_perfil} alt="" className="img-perfil"/> 
                                </button>
                            </div>
                        <form className="form-register" onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
                            <div className="input-group mt-4">
                                <span className="input-group-text">Email</span>
                                <input type="text" name="email" className="form-control" placeholder="Email" value={userData.email} readonly ></input>
                            </div>
                            <div className="input-group mt-4">
                                <span className="input-group-text">Nickname</span>
                                <input type="text" name="nickname" className="form-control " placeholder="Usuario" value={userData.nickname} readonly></input>
                            </div>
                            <div className="input-group mt-4">
                                <span className="input-group-text">Biografía</span>
                                <textarea class="form-control" placeholder="Biografía" value={userData.bio}></textarea>
                            </div>
                            <button type="button" onClick={handleOpenDialogChangePass} className="mt-4 btn btn-secondary">Cambiar contraseña</button>
                            <ChangePassDialog open={openDialogChangePass} onClose={handleCloseDialogChangePass} usuario={user} />
                            <button type="submit" className="mt-4 btn btn-primary">Guardar</button>
                        </form>
                    </div>

                </div>
        </div>
    </div>
)

}

export default Settings