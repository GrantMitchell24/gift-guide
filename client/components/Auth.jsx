import { useEffect, useState } from "react";
import { useAppCtx } from "../utils/AppProvider";

//import design from Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

export default function Auth({ usage = "signup" }) {
  const appCtx = useAppCtx();

  const [userData, setUserData] = useState({ email: "", password: "" });

  function handleInputChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const apiPath = usage === "signup" ? "/" : "/auth";
    const finalPath = `/api/user${apiPath}`;

    try {
      const query = await fetch(finalPath, {
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

  return (
    <Box flexDir="column">
      <Flex flexDir="column">
        <form onSubmit={handleFormSubmit}>
          <Box>
            <Heading>{usage === "signup" ? "Signup" : "Login"}</Heading>
            <Box>
              <Flex flexDir="column">
                <Box>
                  <Flex flexDir="column">
                    <Text className="d-block">Email Address</Text>
                    <Input
                      placeholder="joe@gmail.com"
                      type="text"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </Flex>
                </Box>

                <Box>
                  <Flex flexDir="column">
                    <Text className="d-block">Password</Text>
                    <Input
                      placeholder="secret"
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleInputChange}
                    />
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Flex>
              <Button colorScheme="green">Submit Info</Button>
            </Flex>
          </Box>
        </form>
      </Flex>
    </Box>
  );
}
