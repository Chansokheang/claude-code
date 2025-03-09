import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FaBus, FaUserShield, FaRoute, FaClipboardList } from 'react-icons/fa';
import NavBar from '../components/NavBar';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const featureCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <NavBar />
      
      {/* Hero Section */}
      <header className="bg-primary text-white py-5">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Row className="align-items-center">
              <Col lg={6}>
                <motion.h1 
                  className="display-4 fw-bold mb-4"
                  variants={itemVariants}
                >
                  Bus Management System
                </motion.h1>
                <motion.p 
                  className="lead mb-4"
                  variants={itemVariants}
                >
                  A comprehensive solution for managing your bus fleet, routes, and schedules. 
                  Streamline your operations and boost efficiency with our powerful management tools.
                </motion.p>
                <motion.div variants={itemVariants}>
                  {isAuthenticated ? (
                    <Button
                      as={Link}
                      to="/dashboard"
                      variant="light"
                      size="lg"
                      className="me-3 px-4 py-2"
                    >
                      Go to Dashboard
                    </Button>
                  ) : (
                    <div className="d-flex gap-3">
                      <Button
                        as={Link}
                        to="/login"
                        variant="light"
                        size="lg"
                        className="px-4 py-2"
                      >
                        Login
                      </Button>
                      <Button
                        as={Link}
                        to="/register"
                        variant="outline-light"
                        size="lg"
                        className="px-4 py-2"
                      >
                        Register
                      </Button>
                    </div>
                  )}
                </motion.div>
              </Col>
              <Col lg={6} className="mt-5 mt-lg-0 text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <FaBus size={200} className="text-white opacity-75" />
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </header>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-center mb-5">Key Features</h2>
          </motion.div>

          <Row>
            <Col md={6} lg={3} className="mb-4">
              <motion.div
                variants={featureCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <FaBus className="text-primary mb-3" size={40} />
                    <Card.Title>Bus Management</Card.Title>
                    <Card.Text>
                      Easily add, update, and track your entire bus fleet with details like capacity, maintenance history, and current status.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            
            <Col md={6} lg={3} className="mb-4">
              <motion.div
                variants={featureCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <FaRoute className="text-success mb-3" size={40} />
                    <Card.Title>Route Planning</Card.Title>
                    <Card.Text>
                      Create and optimize routes with detailed information on stops, estimated travel times, and assigned buses.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            
            <Col md={6} lg={3} className="mb-4">
              <motion.div
                variants={featureCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <FaClipboardList className="text-warning mb-3" size={40} />
                    <Card.Title>Scheduling</Card.Title>
                    <Card.Text>
                      Manage departure and arrival times, create recurring schedules, and avoid scheduling conflicts.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            
            <Col md={6} lg={3} className="mb-4">
              <motion.div
                variants={featureCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <FaUserShield className="text-danger mb-3" size={40} />
                    <Card.Title>Secure Access</Card.Title>
                    <Card.Text>
                      Role-based access control ensures that users can only access the information they need.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white text-center py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Ready to streamline your bus operations?</h2>
            <p className="lead mb-4">
              Join now and take control of your fleet management today.
            </p>
            {!isAuthenticated && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  as={Link}
                  to="/register"
                  variant="light"
                  size="lg"
                  className="px-5 py-2"
                >
                  Get Started
                </Button>
              </motion.div>
            )}
          </motion.div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={6}>
              <p>© 2023 Bus Management System. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-md-end">
              <p>Designed with <span className="text-danger">❤</span> for bus operators</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default HomePage;