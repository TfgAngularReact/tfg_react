import { collection, setDoc, doc, getDocs, where, limit, query, orderBy, getDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment/moment';
import  {db} from '../config/firebase';

export const createDoc = async (path, data, id) => {
    try {
        console.log(id);
        const docRef = collection(db, path);
        const docRef1 = doc(docRef, id)
        await setDoc(docRef1, data);
    } catch (error) {
        console.error("Error al crear el documento", error);
    }
    
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