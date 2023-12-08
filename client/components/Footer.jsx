//import Box from Chakra
import { Box, Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box m="10px">
      <Flex>
        <Text fontSize="10px">&copy; Copyright 2023. All rights reserved.</Text>
      </Flex>
    </Box>
  );
}
