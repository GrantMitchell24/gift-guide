import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { Button, ButtonGroup } from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";

import React from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import { Input } from "@chakra-ui/react";

export default function AddItem() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Add Item
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <FormControl>
              <FormLabel>Item Name</FormLabel>
              <Input ref={initialRef} placeholder="Item name" />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Wish Rank</FormLabel>
              <Input placeholder="Wish rank" />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Cost($)</FormLabel>
              <Input ref={initialRef} placeholder="Cost" />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Notes for Buyer</FormLabel>
              <Input ref={initialRef} placeholder="Notes" />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Gift Website Link </FormLabel>
              <Input ref={initialRef} placeholder="Website Link (optional)" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
