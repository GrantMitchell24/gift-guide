import { useState, useEffect } from "react";
import Auth from "../components/Auth";

//import Box from Chakra
import { Box, Flex } from "@chakra-ui/react";

export default function AuthPage(props) {

  return (
    <Box>
      <Flex flexDir="row" justifyContent="space-evenly" align="center">
        <Box >
          <Auth colorPallet={props.colorPallet}/>
        </Box>
      </Flex>
    </Box>
  );
}
