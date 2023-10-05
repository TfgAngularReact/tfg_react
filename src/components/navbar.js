import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link, useNavigate } from "react-router-dom";  
import { useAuth } from '../context/authContext';

function Menu() {
    const { user } = useAuth()
    const [texto, setTexto] = useState("")
    const navigate = useNavigate();


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search/${texto}`);
        }
      };

  return (
    <>
        <Navbar expand="lg"  className="navBg" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">TfgReact</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {user != null ? (
                        <>
                        <Nav.Link as={Link} to={`/juegos/${user.uid}`}>Mis juegos</Nav.Link>
                        <Nav.Link as={Link} to={`/resenas/${user.uid}`}>Mis reseñas</Nav.Link>
                        <Nav.Link as={Link} to={`/listas/${user.uid}`}>Mis Listas</Nav.Link>
                        <Nav.Link as={Link} to={`/perfil/${user.uid}`}>Perfil</Nav.Link>

                        
                        </>

                    ) 
                    : 
                    (
                        <>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
                        </>
                    )}
                        <div className="input-group mb-3" style={{width:"30%"}}>
                            <input type="text" className="form-control buscador" placeholder="Buscar" aria-label="Username" onChange={(e) => setTexto(e.target.value)}
                        onKeyDown={handleKeyPress} aria-describedby="basic-addon1" />
                        </div>
                        
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <section>
            <Outlet></Outlet>
        </section>
    </>


  );
}

export default Menu;