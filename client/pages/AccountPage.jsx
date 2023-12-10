import { useState, useEffect } from "react";
import React from "react";
import { useAppCtx } from "../utils/AppProvider";

// Chakra Imports
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Editable, EditableInput, EditableTextarea, EditablePreview, } from '@chakra-ui/react'
import { Input, useColorModeValue, IconButton, useDisclosure, useEditableControls, ButtonGroup, SlideFade, Tooltip } from '@chakra-ui/react'
import { Center, Button } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

//-------------------------------------------------------------------
// Styling
//-------------------------------------------------------------------
// Color Pallet
// https://coolors.co/palette/386641-6a994e-a7c957-f2e8cf-bc4749
const colorPallet = {
  c1: "#386641", // Dark Green
  c2: "#6A994E", // Middle Green
  c3: "#A7C957", // Light Green
  c4: "#F2E8CF", // Off White
  c5: "#BC4749", // Red
}

const styling = {
  formInput: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: `solid 1px ${colorPallet.c2}`
  }
}



export default function AccountPage(props) {
  // Bring in logged in user info
  const { user } = useAppCtx()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  // Set user info to null
  const [userInfo, setUserInfo] = useState()

  // Fetch most recent user info
  async function getUserInfo() {
    const query = await fetch(`/api/user/${user._id}`)
    const result = await query.json()
    const payload = result.payload
    setUserInfo(payload)
    console.log(payload)
  }

  // Handle change in form
  function handleInputChange(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  // Handle form submit
  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const query = await fetch(`/api/user/${userInfo._id}`, {
        method: "PUT",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json"
        },
      });
      const reponse = await query.json();
      window.location.reload()

    } catch (err) {
      console.log(err.message)
    }
  }



  useEffect(() => {
    getUserInfo()
  }, [user])

  if (!userInfo) return <></>

  return (
    <>
      <Box
        backgroundColor={colorPallet.c4}
        fontSize='xl'
        height="80vh"
        p={10}
        width="100vw"
      >
        <Heading color={colorPallet.c1}> Account</Heading>
        <Text color={colorPallet.c5}>
          Hello, {user.name}!
        </Text>

        <form onSubmit={handleFormSubmit} style={{ maxWidth: "400px" }}>
          <FormControl isRequired my="20px">
            <FormLabel >Name:</FormLabel>
            <Input defaultValue={userInfo.name} type="text" name="name" backgroundColor="#fff" style={styling.formInput} onChange={handleInputChange}></Input>
          </FormControl>

          <FormControl isRequired mb="20px">
            <FormLabel>Username:</FormLabel>
            <Input defaultValue={userInfo.username} type="text" name="username" backgroundColor="#fff" style={styling.formInput} onChange={handleInputChange}></Input>
          </FormControl>

          <FormControl isRequired mb="20px">
            <FormLabel >Email:</FormLabel>
            <Input defaultValue={userInfo.email} type="email" name="email" backgroundColor="#fff" style={styling.formInput} onChange={handleInputChange}></Input>
          </FormControl>

          <Button backgroundColor={colorPallet.c2} color="white" _hover={{ backgroundColor: colorPallet.c3 }} type="submit">Submit</Button>
        </form>

      </Box>

    </>
  );
}
