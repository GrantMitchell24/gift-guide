// Import React
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Import Chakra
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Spacer } from "@chakra-ui/react";

// Import Chakra Icons
import { EditIcon } from '@chakra-ui/icons'

// Import Chakra-React
import { useDisclosure } from "@chakra-ui/react";



export default function UpdateItem(props) {

  // Grabs user id from url
  const params = useParams();

  // Destructure Props
  const colorPallet = props.colorPallet
  const itemInfo = props.itemInfo
  const getUserInfo = props.getUserInfo

  // Modal default
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // Track Item Info
  const [item, setItem] = useState(itemInfo)

  // Handle change in form
  function handleInputChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  // Update item info
  async function handleItemUpdate(e) {
    e.preventDefault();
    try {
      await fetch(`/api/user/${params.userId}/item/${itemInfo._id}`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json"
        }
      })
      getUserInfo()
      onClose()
    } catch (err) {
      console.log(err.message)
    }
  }

  // Styling for all the input fields in modal
  const formInput = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: `solid 1px ${colorPallet.c2}`
  }


  if (!itemInfo) return <></>
  
  return (
    <>
      <Button
        onClick={onOpen}
        boxSize={"30px"}
        color={"#fff"}
        backgroundColor={colorPallet.c2}
        _hover={{ backgroundColor: colorPallet.c1 }}
        borderRadius="5px"
        p="4px"
      >
        <EditIcon />
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <FormControl>
              <FormLabel>Item Name</FormLabel>
              <Input
                name="name"
                defaultValue={itemInfo.name}
                onChange={handleInputChange}
                backgroundColor="#fff"
                style={formInput}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Wish Rank (Low 1 - High 10)</FormLabel>
              <Input
                name="wishRank"
                defaultValue={itemInfo.wishRank}
                onChange={handleInputChange}
                backgroundColor="#fff"
                style={formInput}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Cost ($) </FormLabel>
              <Input
                name="cost"
                defaultValue={itemInfo.cost}
                onChange={handleInputChange}
                backgroundColor="#fff"
                style={formInput}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Notes for Buyer</FormLabel>
              <Input
                name="notes"
                defaultValue={itemInfo.notes}
                onChange={handleInputChange}
                backgroundColor="#fff"
                style={formInput}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Gift Website Link </FormLabel>
              <Input
                name="link"
                defaultValue={itemInfo.link}
                onChange={handleInputChange}
                backgroundColor="#fff"
                style={formInput}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              backgroundColor={colorPallet.c1}
              color="white"
              _hover={{ backgroundColor: colorPallet.c2 }}
              onClick={handleItemUpdate}
            >
              Save
            </Button>
            <Spacer />
            <Button onClick={onClose} backgroundColor={colorPallet.c4}>Cancel</Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
