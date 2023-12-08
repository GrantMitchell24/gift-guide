//import Box from Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <>
      <Box flexDir="row" m="10px">
        <Flex flexDir="column" align="left" w="100%">
          {/* <AvatarGroup spacing="1rem">
            <Avatar bg="green" />
          </AvatarGroup> */}
          <Heading size="lg">Home Page</Heading>
          <Text>The home page can be accessed by everyone.</Text>
        </Flex>
      </Box>
    </>
  );
}
