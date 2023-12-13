import { useState, useEffect } from "react";
import React from "react";
import { useAppCtx } from "../utils/AppProvider";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import Cookie from "js-cookie"

// Import Components
import CustomModal from "../components/CustomModal";


// Chakra Imports
import { Box, Flex, Heading, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons'
import { Input, Button } from '@chakra-ui/react'


export default function AccountPage(props) {
  // Bring in logged in user info
  const { user } = useAppCtx()

  // Set user info to null
  const [userInfo, setUserInfo] = useState()

  // Brings in color pallet from props
  const colorPallet = props.colorPallet

  // Sets style for input fields based off props colors
  const styling = {
    formInput: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      border: `solid 1px ${colorPallet.c2}`
    }
  }

  // Sets hello name so that won't update accept on reload or on successful form submission
  const [helloName, setHelloName] = useState()

  // Used to display error message if email or username is already taken
  const defaultError = ""
  const [error, setError] = useState(defaultError)

  // Fetch most recent user info
  async function getUserInfo() {
    const query = await fetch(`/api/user/${user._id}`)
    const result = await query.json()
    const payload = result.payload
    setHelloName(payload.name)
    setUserInfo(payload)
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
      if (reponse.result === "success") {
        setError(false)
        setTimeout(() => {
          setError("")
        }, 2000)
        setHelloName(reponse.payload.name)
      } else {
        setError(true)
        setTimeout(() => {
          setError("")
        }, 5000)

      }


    } catch (err) {
      console.log(err.message)
    }
  }

  const [deleteAccount, setDeleteAccount] = useState(null)

  async function deleteActBtn() {
    try {
      await fetch(`/api/user/${userInfo._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDeleteAccount(null)
      Cookie.remove("auth-cookie")
      window.location.href = "/"
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    if (user._id) {
      getUserInfo()
    }
  }, [user])


  if (!user || !userInfo) return <></>

  return (
    <>
      <Box
        fontSize='xl'
        height="80vh"
        p={10}
        width="100vw"
        minW="320px"
        bgImage="url(../public/assets/images/joanna-kosinska-0CQfTLOVTPU-unsplash.jpg)"
        bgSize="cover"
        bgRepeat="no-repeat"
      >
        <Heading color={colorPallet.c1}> Account</Heading>
        <Text color={colorPallet.c5} mb="20px">
          Hello, {helloName}!
        </Text>

        <form onSubmit={handleFormSubmit} style={{ maxWidth: "400px", padding: "20px", border: `solid 1px ${colorPallet.c1}`, borderRadius: "20px", backgroundColor: colorPallet.c4 }}>
          <FormControl isRequired mb="20px">
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

          {error === true &&
            <Text fontSize='md' color={colorPallet.c5} mb="20px">
              <NotAllowedIcon p="3px" boxSize="25px" backgroundColor={colorPallet.c5} color={colorPallet.c4} borderRadius="50%" /> The username or email you're trying to switch to is already taken. Please try another.</Text>
          }

          {error === false &&
            <Flex>
              <CheckCircleIcon color={colorPallet.c2} mr="8px" />
              <Text fontSize='md' color={colorPallet.c2} mb="20px">Account updated!</Text>
            </Flex>
          }

          <Button type="submit" backgroundColor={colorPallet.c1} color="white" _hover={{ backgroundColor: colorPallet.c2 }}>Submit</Button>
        </form>

        <Button onClick={() => setDeleteAccount()}>Delete My Account</Button>

        <CustomModal title="Deleting Account" isOpen={deleteAccount !== null} onClose={() => setDeleteAccount(null)}>
          <FormControl>
            <FormLabel>Are you sure you want to delete this account?</FormLabel>
          </FormControl>
          <Button
            onClick={() => deleteActBtn(deleteAccount)}

            backgroundColor={colorPallet.c5} color="white" _hover={{ backgroundColor: colorPallet.c5 }} mr={3}>
            Yes
          </Button>
          <Button onClick={() => setDeleteAccount(null)} backgroundColor={colorPallet.c2}>No</Button>
        </CustomModal>

      </Box>
    </>
  );
}
