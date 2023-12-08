//import Box from Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";

import { NavBar } from "../components";

export default function PrivatePage() {
  return (
    <>
      <Box m="10px">
        <Flex>
          <Heading>Private Page</Heading>
          <Text>
            This is an example of a page that would require an authenticated
            user.
          </Text>
          {/* <Tooltip hasArrow label="Search places" bg="gray.300" color="black">
          </Tooltip> */}
          <NavBar/>
        </Flex>
      </Box>
    </>
  );
}
