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
    // <Navbar expand="lg" className="bg-body-tertiary">
    //   <Container>
    //     <Navbar.Brand href="/">My Web Site</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         {user?._id !== undefined && (
    //           <Nav.Link href="/private">Private Page</Nav.Link>
    //         )}

    //         {user?._id !== undefined ? (
    //           <Nav.Link href="/logout">Logout</Nav.Link>
    //         ) : (
    //           <Nav.Link href="/auth">Login</Nav.Link>
    //         )}
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>

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
