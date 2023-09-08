import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link } from "react-router-dom";  
import { useAuth } from '../context/authContext';

function Menu() {
    const { user } = useAuth()


  return (
    <>
        <Navbar expand="lg" className="navBg" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">TfgReact</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {user != null ? (
                        <>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to={`/resenas/${user.uid}`}>Tus reseñas</Nav.Link>
                        <Nav.Link as={Link} to={`/perfil/${user.uid}`}>Perfil</Nav.Link>
                        <Nav.Link as={Link} to={`/juegos/${user.uid}`}>Tus juegos</Nav.Link>

                        </>

                    ) 
                    : 
                    (
                        <>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
                        </>
                    )}

                        
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