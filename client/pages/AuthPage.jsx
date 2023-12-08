import { useState, useEffect } from "react";
import Auth from "../components/Auth";

//import Box from Chakra
import { Box, Flex } from "@chakra-ui/react";

export default function AuthPage() {
  return (
    <Box>
      <Flex flexDir="row" justifyContent="space-evenly" align="center">
        <Box p="20px">
          <Auth usage="signup" />
        </Box>

        <Box p="20px">
          <Auth usage="login" />
        </Box>
      </Flex>
    </Box>
  );
}
