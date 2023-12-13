// Import React
import React from "react";

// Chakra Imports
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from '@chakra-ui/react'


export default function CustomModal(props){

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalBody pb={6}>
          { props.children }
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}