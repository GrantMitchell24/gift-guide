import { useEffect, useState } from "react";
import { useAppCtx } from "../utils/AppProvider";

//import design from Chakra
import { Box, Flex, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, } from '@chakra-ui/react'
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons'

export default function Auth(props) {
  const appCtx = useAppCtx();

  // -----------------------------------
  // Styling
  // -----------------------------------

  // Brings in color pallet from props
  const colorPallet = props.colorPallet

  // Sets style for input based off props colors
  const styling = {
    formInput: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      border: `solid 1px ${colorPallet.c2}`
    }
  }
  
    // -----------------------------------
  // HANDLES LOGIN
  // -----------------------------------

  const [userLoginData, setUserLoginData] = useState({ email: "", password: "" });

  const [loginError, setLoginError] = useState(false)

  function handleInputChangeLogin(e) {
    setUserLoginData({ ...userLoginData, [e.target.name]: e.target.value });
  }

  async function handleFormSubmitLogin(e) {
    e.preventDefault();
    // const apiPath = usage === "signup" ? "/" : "/auth";
    const finalPath = `/api/user/auth`;

    try {
      const query = await fetch(finalPath, {
        method: "POST",
        body: JSON.stringify(userLoginData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await query.json();
      console.log(response);
      if (response.result === "success") {
        window.location.href = "/";
      } else {
        setLoginError(true)
        // setTimeout(() => {
        //   setLoginError("")
        // }, 3000)
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    setUserLoginData({ ...userLoginData, email: appCtx.user.email || "" });
  }, [appCtx]);

  // -----------------------------------
  // HANDLES SIGNUP
  // -----------------------------------
  const [userData, setUserData] = useState({ name: "", username: "", email: "", password: "" });

  const [signupError, setSignupError] = useState(false)

  function handleInputChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const query = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await query.json();

      if (response.result === "success") {
        window.location.href = "/";
        
      } else {
        setSignupError(true)
        // setTimeout(() => {
        //   setLoginError("")
        // }, 3000)
      }

    } catch (err) {
      console.log(err.message);
    } 
  }

  useEffect(() => {
    setUserData({ ...userData, email: appCtx.user.email || "" });
  }, [appCtx]);




  return (
    <Box
      fontSize='xl'
      py={10}
      width="100vw"
      minW="320px"
      bgImage="url(/assets/images/joanna-kosinska-0CQfTLOVTPU-unsplash.jpg)"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Wrap
        // flexDir="column" 
        justify="center"
        w="100%"
        minHeight="70vh"
      >
        {/* LOGIN FORM */}
        <form onSubmit={handleFormSubmitLogin}>
          <Box
            m="0px 20px 20px 20px"
            border={`solid 1px ${colorPallet.c1}`}
            borderRadius="10px"
            p="15px 0px 10px 0px"
            backgroundColor={colorPallet.c1}
            w="275px"
          >
            <Heading size="md" align="center" color={"#fff"}>Login</Heading>
            <Box backgroundColor={colorPallet.c4} m="20px 0px 0px 0px">
              <Flex flexDir="column" align="center" p="10px">
                <Box>
                  <FormControl isRequired flexDir="column">
                    <FormLabel className="d-block">Email Address</FormLabel>
                    <Input
                      style={styling.formInput}
                      placeholder="Email"
                      _placeholder={{ color: "inherit" }}
                      type="email"
                      name="email"
                      value={userLoginData.email}
                      onChange={handleInputChangeLogin}
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isRequired flexDir="column" p="10px">
                    <FormLabel className="d-block">Password</FormLabel>
                    <Input
                      style={styling.formInput}
                      placeholder="Password"
                      _placeholder={{ color: "inherit" }}
                      type="password"
                      name="password"
                      value={userLoginData.password}
                      onChange={handleInputChangeLogin}
                    />
                  </FormControl>
                </Box>
              </Flex>
              {loginError === true &&
                <Text fontSize='md' color={colorPallet.c5} p="0px 10px 15px 10px">
                  <NotAllowedIcon p="3px" fontSize="25px" color={colorPallet.c5} borderRadius="50%" /> The email or password you entered is incorrect</Text>
              }
            </Box>
            <Flex flexDir="row" justifyContent="center" align="center">
              <Button type="submit" align="center" color={colorPallet.c1} backgroundColor={"#fff"} _hover={{ backgroundColor: colorPallet.c4 }} w="80px" mt="10px" p="10px">
                Login
              </Button>
            </Flex>
          </Box>
        </form>

        {/* SIGN-UP FORM */}
        <form onSubmit={handleFormSubmit}>
          <Box
            mx="20px"
            border={`solid 1px ${colorPallet.c1}`}
            borderRadius="10px"
            p="15px 0px 10px 0px"
            backgroundColor={colorPallet.c1}
            w="275px"
          >
            <Heading size="md" align="center" color={"#fff"}>Sign-Up</Heading>
            <Box px="10px" backgroundColor={colorPallet.c4} m="20px 0px 10px 0px">
              <Flex flexDir="column" align="center" p="10px">
                <Box>
                  <FormControl isRequired flexDir="column">
                    <FormLabel className="d-block">Name</FormLabel>
                    <Input
                      style={styling.formInput}
                      placeholder="Name"
                      _placeholder={{ color: "inherit" }}
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
                <Box p="10px">
                  <FormControl isRequired flexDir="column">
                    <FormLabel className="d-block">Username</FormLabel>
                    <Input
                      style={styling.formInput}
                      placeholder="Username"
                      _placeholder={{ color: "inherit" }}
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
                <Box p="10px">
                  <FormControl isRequired flexDir="column">
                    <FormLabel className="d-block">Email Address</FormLabel>
                    <Input
                      style={styling.formInput}
                      placeholder="Email"
                      _placeholder={{ color: "inherit" }}
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
                <Box >
                  <FormControl isRequired flexDir="column" p="10px">
                    <FormLabel className="d-block">Password</FormLabel>
                    <Input
                      style={styling.formInput}
                      placeholder="Password"
                      _placeholder={{ color: "inherit" }}
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
              </Flex>
              {signupError === true &&
                <Text fontSize='md' color={colorPallet.c5} p="0px 10px 15px 10px">
                  <NotAllowedIcon p="3px" fontSize="25px" color={colorPallet.c5} borderRadius="50%" /> The email or username you're trying to use is already in use. </Text>
              }
            </Box>
            <Flex flexDir="row" justifyContent="center" align="center">
              <Button type="submit" align="center" color={colorPallet.c1} backgroundColor={"#fff"} _hover={{ backgroundColor: colorPallet.c4 }} w="80px" p="5px">
                Sign-Up
              </Button>
            </Flex>
          </Box>
        </form>
      </Wrap>
    </Box>
  );
}
