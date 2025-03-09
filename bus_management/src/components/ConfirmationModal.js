import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const ConfirmationModal = ({ show, handleClose, handleConfirm, title, message, confirmButtonText, confirmButtonVariant }) => {
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title || 'Confirm Action'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message || 'Are you sure you want to proceed with this action?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant={confirmButtonVariant || 'danger'} 
              onClick={handleConfirm}
            >
              {confirmButtonText || 'Confirm'}
            </Button>
          </motion.div>
        </Modal.Footer>
      </motion.div>
    </Modal>
  );
};

export default ConfirmationModal;