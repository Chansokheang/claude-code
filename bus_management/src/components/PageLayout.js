import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import { motion } from 'framer-motion';

const PageLayout = ({ children, title }) => {
  return (
    <>
      <NavBar />
      <Container className="py-4">
        {title && (
          <motion.h1 
            className="mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </Container>
    </>
  );
};

export default PageLayout;