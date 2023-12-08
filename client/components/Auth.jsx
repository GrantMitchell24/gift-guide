import { useEffect, useState } from "react";
import { useAppCtx } from "../utils/AppProvider";

//import design from Chakra
import { Box, Flex, Heading, Text} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText,} from '@chakra-ui/react'
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

export default function Auth({ usage = "signup" }) {
  const appCtx = useAppCtx();

  // -----------------------------------
  // HANDLES SIGNUP
  // -----------------------------------
  const [userData, setUserData] = useState({ name: "", username: "", email: "", password: "" });

  function handleInputChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log("hello")
    // const apiPath = usage === "signup" ? "/" : "/auth";
    // const finalPath = `/api/user/`;

    try {
      console.log(userData)
      const query = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await query.json();
      console.log(response);
      if (response.result === "success") {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    setUserData({ ...userData, email: appCtx.user.email || "" });
  }, [appCtx]);

  // -----------------------------------
  // HANDLES LOGIN
  // -----------------------------------

  const [userLoginData, setUserLoginData] = useState({ email: "", password: "" });

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
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    setUserLoginData({ ...userLoginData, email: appCtx.user.email || "" });
  }, [appCtx]);


  return (
    <Box>
      <Flex flexDir="column" align="center" w="100%">
        <form onSubmit={handleFormSubmit}>
          <Box>
            {/* SIGN-UP FORM */}
            <Heading size="md" align="center">Sign-Up</Heading>
            <Box>
              <Flex flexDir="column" align="center" p="10px">
                <Box>
                  <Flex flexDir="column">
                    <Text className="d-block">Name</Text>
                    <Input
                      color="teal"
                      placeholder="Name"
                      _placeholder={{ color: "inherit" }}
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                    />
                  </Flex>
                </Box>
                <Box>
                  <Flex flexDir="column">
                    <Text className="d-block">Username</Text>
                    <Input
                      color="teal"
                      placeholder="Username"
                      _placeholder={{ color: "inherit" }}
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                    />
                  </Flex>
                </Box>
                <Box>
                  <Flex flexDir="column">
                    <Text className="d-block">Email Address</Text>
                    <Input
                      color="teal"
                      placeholder="email@gmail.com"
                      _placeholder={{ color: "inherit" }}
                      type="text"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </Flex>
                </Box>
                <Box>
                  <Flex flexDir="column" p="10px">
                    <Text className="d-block">Password</Text>
                    <Input
                      color="teal"
                      placeholder="Enter password"
                      _placeholder={{ color: "inherit" }}
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleInputChange}
                    />
                  </Flex>
                </Box>
              </Flex>
            </Box>

            <Flex flexDir="row" justifyContent="center" align="center">
              <Button type="submit" align="center" colorScheme="green" p="5px">
                Submit Info
              </Button>
            </Flex>
          </Box>
        </form>

        <form onSubmit={handleFormSubmitLogin}>

          <Box>
            <Heading size="md" align="center">Login</Heading>
            <Box>
              <Flex flexDir="column" align="center" p="10px">
                <Box>
                  <Flex flexDir="column">
                    <Text className="d-block">Email Address</Text>
                    <Input
                      color="teal"
                      placeholder="email@gmail.com"
                      _placeholder={{ color: "inherit" }}
                      type="text"
                      name="email"
                      value={userLoginData.email}
                      onChange={handleInputChangeLogin}
                    />
                  </Flex>
                </Box>

                <Box>
                  <Flex flexDir="column" p="10px">
                    <Text className="d-block">Password</Text>
                    <Input
                      color="teal"
                      placeholder="Enter password"
                      _placeholder={{ color: "inherit" }}
                      type="password"
                      name="password"
                      value={userLoginData.password}
                      onChange={handleInputChangeLogin}
                    />
                  </Flex>
                </Box>
              </Flex>
            </Box>

            <Flex flexDir="row" justifyContent="center" align="center">
              <Button type="submit" align="center" colorScheme="green" p="5px">
                Login
              </Button>
            </Flex>
          </Box>
        </form>
      </Flex>
    </Box>
  );
}
