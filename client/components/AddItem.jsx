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

import { useState } from "react";

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

  const defaultNewItem = {
    name: "",
    wishRank: "",
    cost: "",
    notes: "",
    link: "",
  };

  const [newItem, setNewItem] = useState(defaultNewItem);

  function handleCreateItemButton() {
    console.log("Create Item");
  }

  function handleInputChange(e) {
    // console.log(e.target.name)
    // console.log(e.target.value)

    const clone = { ...newItem, [e.target.name]: e.target.value };

    setNewItem(clone);
    console.log(clone);
  }

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
              <Input
                ref={initialRef}
                onChange={handleInputChange}
                value={newItem}
                name="name"
                placeholder="Item name"
                type="text"
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Wish Rank</FormLabel>
              <Input name="wishRank" placeholder="Wish rank" type="text" />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Cost($)</FormLabel>
              <Input
                name="cost"
                ref={initialRef}
                placeholder="Cost"
                type="text"
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Notes for Buyer</FormLabel>
              <Input
                name="notes"
                ref={initialRef}
                placeholder="Notes"
                type="text"
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Gift Website Link </FormLabel>
              <Input
                name="link"
                ref={initialRef}
                placeholder="Website Link (optional)"
                type="text"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleCreateItemButton}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
