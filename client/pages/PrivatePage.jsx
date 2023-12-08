//import Box from Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function PrivatePage() {
  return (
    <>
      <Box>
        <Flex>
          <Heading>Private Page</Heading>
          <Text>
            This is an example of a page that would require an authenticated
            user.
          </Text>
        </Flex>
      </Box>
    </>
  );
}
