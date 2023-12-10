import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <>
      <Box flexDir="row" m="10px">
        <Flex flexDir="column" align="left" w="100%">
          <Heading size="lg">Home Page</Heading>
          <Text>The home page can be accessed by everyone.</Text>
        </Flex>
      </Box>
    </>
  );
}
