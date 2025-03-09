import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FaBus, FaUserPlus } from 'react-icons/fa';

// Validation schema
const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const RegisterPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setError('');
      setSuccess('');
      
      const userData = {
        email: values.email,
        password: values.password,
      };
      
      const result = await register(userData);
      
      if (result.success) {
        setSuccess('Registration successful! You can now log in.');
        resetForm();
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to register. Please try again.');
      console.error('Registration error:', error);
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
                
                <h4 className="text-center mb-4">Register</h4>
                
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                <Formik
                  initialValues={{ email: '', password: '', confirmPassword: '' }}
                  validationSchema={RegisterSchema}
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
                          placeholder="Create a password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                          placeholder="Confirm your password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
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
                          <FaUserPlus className="me-2" />
                          {isSubmitting ? 'Registering...' : 'Register'}
                        </Button>
                      </motion.div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
            
            <div className="w-100 text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;