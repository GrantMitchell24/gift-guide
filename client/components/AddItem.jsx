// Import React
import React from "react";
import { useState} from "react";

// Import Utils
import { useAppCtx } from "../utils/AppProvider";

// Import Chakra
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FormControl, FormLabel} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

// Import Chakra-React
import { useDisclosure } from "@chakra-ui/react";


export default function AddItem(props) {

  // Bring color pallet in from props
  const colorPallet = props.colorPallet

  // Bring in logged in user info who is logged in
  const { user } = useAppCtx();

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

  async function handleCreateItemButton() {
    try {
      const query = await fetch(`/api/user/${user._id}/item`, {
        method: "PUT",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await query.json();
      window.location.reload();
      onClose();
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleInputChange(e) {
    const clone = { ...newItem, [e.target.name]: e.target.value };
    setNewItem(clone);
  }


  return (
    <>
      <Button onClick={onOpen} backgroundColor={colorPallet.c2} color="white" _hover={{ backgroundColor: colorPallet.c1 }} mb="20px">
        Add Item +
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
            <FormControl isRequired>
              <FormLabel>Item Name</FormLabel>
              <Input
                ref={initialRef}
                onChange={handleInputChange}
                value={newItem.name}
                name="name"
                placeholder="Item name"
                type="text"
                borderColor={colorPallet.c2}
                focusBorderColor={colorPallet.c3}
                _hover={{ borderColor: colorPallet.c3 }}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Wish Rank (Low 1 - High 10)</FormLabel>
              <Input
                name="wishRank"
                onChange={handleInputChange}
                value={newItem.wishRank}
                placeholder="Wish rank (optional)"
                type="text"
                borderColor={colorPallet.c2}
                focusBorderColor={colorPallet.c3}
                _hover={{ borderColor: colorPallet.c3 }}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Cost($)</FormLabel>
              <Input
                name="cost"
                ref={initialRef}
                onChange={handleInputChange}
                value={newItem.cost}
                placeholder="Cost (optional)"
                type="text"
                borderColor={colorPallet.c2}
                focusBorderColor={colorPallet.c3}
                _hover={{ borderColor: colorPallet.c3 }}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Notes for Buyer</FormLabel>
              <Input
                name="notes"
                ref={initialRef}
                onChange={handleInputChange}
                value={newItem.notes}
                placeholder="Notes (optional)"
                type="text"
                borderColor={colorPallet.c2}
                focusBorderColor={colorPallet.c3}
                _hover={{ borderColor: colorPallet.c3 }}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Gift Website Link </FormLabel>
              <Input
                name="link"
                ref={initialRef}
                onChange={handleInputChange}
                value={newItem.link}
                placeholder="Website Link (optional)"
                type="text"
                borderColor={colorPallet.c2}
                focusBorderColor={colorPallet.c3}
                _hover={{ borderColor: colorPallet.c3 }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleCreateItemButton} backgroundColor={colorPallet.c1} color="white" _hover={{ backgroundColor: colorPallet.c2 }} mr={3}>
              Save
            </Button>
            <Button onClick={onClose} backgroundColor={colorPallet.c4}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
