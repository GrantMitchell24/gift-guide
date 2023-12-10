// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAppCtx } from "../utils/AppProvider";

//import from Chakra
import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function Header() {
  const { user } = useAppCtx();

  return (
    <Box m="10px">
      <Flex
        as="nav"
        flexDir="column"
        justify-content="space-between"
        align-items="center"
        w="100%"
      >
        <Box>
          <Heading>The Gift Guide</Heading>
        </Box>
        <Box>
          {user?._id !== undefined && (
            <ChakraLink as={ReactRouterLink} href="/private">
              Private Page
            </ChakraLink>
          )}

          {user?._id !== undefined ? (
            <ChakraLink href="/logout">Logout</ChakraLink>
          ) : (
            <ChakraLink href="/auth">
              <Button colorScheme="green">Login</Button>
            </ChakraLink>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
