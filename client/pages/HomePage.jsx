//import Box from Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <>
      <Box>
        <Flex flexDir="column">
          <Heading>Home Page</Heading>
          <Text>The home page can be accessed by everyone.</Text>
        </Flex>
      </Box>
    </>
  );
}
