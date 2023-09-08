import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './layouts/home';
import Perfil from './layouts/perfil';
import Resenas from './layouts/resenas';
import Menu from './components/navbar';
import Login from './layouts/login';

import {auth} from './config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Registro from './layouts/registro';
import { AuthProvider, useAuth } from './context/authContext';
import Juegos from './layouts/juegos';


function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, currentUser =>{
          if(currentUser){
            setUser(currentUser);  
          }
        })
        console.log(user);
    })

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />}>
              <Route index element={<Home />} />
                {user!=null ? (
                  <>
                  <Route path="juegos/:uid" element={<Juegos />} />
                  <Route path="resenas/:uid" element={<Resenas />} />
                  <Route path="perfil/:uid" element={<Perfil setUser={setUser}/>} />

                  <Route path="registro" element={<Navigate replace to="/" />} />
                  <Route path="login" element={<Navigate replace to="/" />} />
                </>
              ) : (
                <>
                  <Route path="juegos/:uid" element={<Navigate replace to="/" />} />
                  <Route path="resenas/:uid" element={<Navigate replace to="/" />} />
                  <Route path="perfil/:uid" element={<Navigate replace to="/" />} />

                  <Route path="login" element={<Login />} />
                  <Route path="registro" element={<Registro />} />
                </>
              )}
              <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
export default App
