import { useState, useEffect } from "react";
import React from "react";
import { useAppCtx } from "../utils/AppProvider";


// Chakra Imports
import { Box, Flex, Heading, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons'
import { Input, Button } from '@chakra-ui/react'


//-------------------------------------------------------------------
// Styling
//-------------------------------------------------------------------
// Background Image
// https://unsplash.com/photos/white-baubles-and-sleigh-bells-0CQfTLOVTPU

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
//-------------------------------------------------------------------



export default function AccountPage(props) {
  // Bring in logged in user info
  const { user } = useAppCtx()

  // Set user info to null
  const [userInfo, setUserInfo] = useState()

  // Sets hello name that won't update accept on reload or on successful form submission
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

  useEffect(() => {
    getUserInfo()
  }, [user])


  if (!userInfo) return <></>

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
                <NotAllowedIcon p="3px" boxSize="25px" backgroundColor={colorPallet.c5} color={colorPallet.c4} borderRadius="50%"/> The username or email you're trying to switch to is already taken. Please try another.</Text>

          }

          {error === false &&
            <Flex>
              <CheckCircleIcon color={colorPallet.c2} mr="8px"/>
              <Text fontSize='md' color={colorPallet.c2} mb="20px">Account updated!</Text>
            </Flex>
          }

          <Button type="submit" backgroundColor={colorPallet.c1} color="white" _hover={{ backgroundColor: colorPallet.c2 }}>Submit</Button>
        </form>

      </Box>
    </>
  );
}
