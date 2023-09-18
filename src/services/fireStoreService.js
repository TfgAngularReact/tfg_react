import { collection, setDoc, doc, getDocs, where, limit, query, orderBy, getDoc, updateDoc, startAfter } from 'firebase/firestore';
import moment from 'moment/moment';
import  {db} from '../config/firebase';
import { v4 as uuidv4 } from 'uuid'; // Importar la función v4 de uuid


export const createDoc = async (path, data, id) => {
    try {
        console.log(id);
        const docRef = collection(db, path);
        const docRef1 = doc(docRef, id)
        return await setDoc(docRef1, data);
    } catch (error) {
        console.error("Error al crear el documento", error);
    }
    
}

export const getId = () =>{
    return uuidv4()
}

export const updateDocument = async (path, data, id) => {
    try {
        const docRef = doc(db, path, id);
        await updateDoc(docRef, data);  
    }
    catch (error) {
        console.error('Error al actualizar el documento:', error);
    }
}

export const getDocument = async (path, id) => {
    try {
        const docRef = doc(db, path, id);
        const querySnapshot = await getDoc(docRef);  
        const document = querySnapshot.data();
  
        return document
    }
    catch (error) {
        console.error('Error', error);
    }
}

export const getCollection = async (path) => {
    try{
        const docRef = collection(db, path)
        const data = await getDocs(docRef)
        return data
    }catch(e){
        console.error("Error", e)
    }
}

export const getJuegosNuevos = async () => {
    const collectionRef = collection(db, 'Juegos')
    const limitDate = moment().subtract(200, 'days').format("DD-MM-YYYY");
    const queryRef = query(collectionRef, where('fechaCreacion', '>', moment(limitDate, "DD-MM-YYYY").toDate()), limit(6));
    try {
        const querySnapshot = await getDocs(queryRef);
        const novedadesJuegosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return novedadesJuegosData
    } catch (error) {
        console.error("Error al pedir las novedades de juegos", error)
    }


}


export const getResenasPopulares = async () => {
    const collectionRef = collection(db, 'Resenas');
    const limitDate = moment().subtract(200, 'days').format("DD-MM-YYYY");
    const queryRef = query(collectionRef, where('fechaCreacion', '>', moment(limitDate, "DD-MM-YYYY").toDate()),orderBy('fechaCreacion'), orderBy('num_likes', 'desc'), limit(6));
    try {
        const querySnapshot = await getDocs(queryRef);
        const resenasPopularesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return resenasPopularesData
    } catch (error) {
        console.error("Error al pedir las reseñas populares")
    }
}

export const getDocumentos = async (path, tipo_busqueda, campo, datos) => {
    const docRef = collection(db, path);
    const q = query(docRef, where(campo,tipo_busqueda,datos)); // Ajusta la cantidad de documentos por página

    try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        return data;

    } catch (error) {
        console.error("Error al realizar la consulta", error);
    }
}

export const getConsultaPaginada = async (ultimaDocumento, path, tipo_busqueda, campo ,datos) => {

    const docRef = collection(db, path);
    const q = query(docRef, where(campo,tipo_busqueda,datos), limit(20)); // Ajusta la cantidad de documentos por página

    try{
        if (ultimaDocumento) {
            console.log("Ultima Documento",ultimaDocumento);
            const siguientePaginaQuery = startAfter(q, ultimaDocumento.data.id);
            const snapshot = await getDocs(siguientePaginaQuery);
            const nuevosDocumentos = snapshot.docs.map((doc) => doc.data());
            return { data: nuevosDocumentos, ultimaDocumento: snapshot.docs[snapshot.docs.length -1] };
        } else {
            const snapshot = await getDocs(q);
            const nuevosDocumentos = snapshot.docs.map((doc) => doc.data());
            return { data: nuevosDocumentos, ultimaDocumento: snapshot.docs[snapshot.docs.length -1] };
            }
    } catch (error) {
        console.error("Error al realizar la consulta paginada", error);
    }

}