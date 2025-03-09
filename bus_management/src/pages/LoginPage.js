import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FaBus, FaSignInAlt } from 'react-icons/fa';

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError('');
      const result = await login(values.email, values.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to log in. Please try again.');
      console.error('Login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow">
              <Card.Body>
                <div className="text-center mb-4">
                  <motion.div 
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 1, repeat: 0 }}
                  >
                    <FaBus size={48} className="text-primary mb-2" />
                  </motion.div>
                  <h2 className="text-center mb-4">Bus Management System</h2>
                </div>
                
                <h4 className="text-center mb-4">Login</h4>
                
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={touched.email && !!errors.email}
                          placeholder="Enter your email"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={touched.password && !!errors.password}
                          placeholder="Enter your password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <motion.div 
                        className="d-grid gap-2 mt-4"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          variant="primary" 
                          type="submit" 
                          disabled={isSubmitting}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <FaSignInAlt className="me-2" />
                          {isSubmitting ? 'Logging in...' : 'Login'}
                        </Button>
                      </motion.div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
            
            <div className="w-100 text-center mt-3">
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;