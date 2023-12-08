import { useState, useEffect } from "react";
import Auth from "../components/Auth";

//import Box from Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function AuthPage() {
  return (
    <Box>
      <Flex>
        <Box>
          <Auth usage="signup" />
        </Box>

        <Box>
          <Auth usage="login" />
        </Box>
      </Flex>
    </Box>
  );
}
