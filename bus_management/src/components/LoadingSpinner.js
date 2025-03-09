import React from 'react';
import { Spinner, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Spinner animation="border" role="status" variant="primary" style={{ width: '4rem', height: '4rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </motion.div>
    </Container>
  );
};

export default LoadingSpinner;