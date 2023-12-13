// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavBar } from "./index.js";
import { useAppCtx } from "../utils/AppProvider";
import { Image } from '@chakra-ui/react'

//import from Chakra
import { Box, Flex, Heading, Button, Spacer } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function Header(props) {

  // Bring in color pallet
  const colorPallet = props.colorPallet

  const { user } = useAppCtx();

  return (
    <Box p="10px 20px" backgroundColor={colorPallet.c1}>
      <Flex
        as="nav"
        flexDir="column"
        justify-content="space-between"
        align-items="center"
        w="100%"
      >
        <Flex>
          <a href="/"><Image height="4rem" src={"/assets/images/Giftify.png"} alt='logo' /></a>
          <Spacer />
          <Box>
            {user?._id !== undefined && (
              <NavBar />
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
