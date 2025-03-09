import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBus, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NavBar = () => {
  const { isAuthenticated, logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="mb-4">
      <Container>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <FaBus className="me-2" />
            Bus Management System
          </Navbar.Brand>
        </motion.div>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/buses">Buses</Nav.Link>
                <Nav.Link as={Link} to="/routes">Routes</Nav.Link>
                <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
                  <FaUserCircle className="me-1" />
                  {currentUser?.email}
                </Nav.Link>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button 
                    variant="outline-light" 
                    onClick={handleLogout} 
                    className="ms-2 d-flex align-items-center"
                  >
                    <FaSignOutAlt className="me-1" />
                    Logout
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;