//import Box from Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { NavBar } from "../components";
import EmailAlert from "../components/EmailAlert";

export default function PrivatePage() {
  return (
    <>
      <Box m="10px">
        <Flex flexDir="column" scrollBehavior="smooth">
          <Box>
            <Flex>
              <Heading>Account Page</Heading>
            </Flex>
          </Box>
          <Box>
            <Flex flexDir="column">
              <Text>Welcome to your account!</Text>
              <Box>
                <Flex flexDir="row">
                  <NavBar />
                </Flex>
              </Box>
              <EmailAlert />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
