// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAppCtx } from "../utils/AppProvider";

//import from Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

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

    <Box>
      <Flex
        as="nav"
        flexDir="column"
        justify-content="space-between"
        align-items="center"
        w="100%"
      >
        <Heading>The Gift Guide</Heading>
        {user?._id !== undefined && <Link href="/private">Private Page</Link>}

        {user?._id !== undefined ? (
          <Link href="/logout">Logout</Link>
        ) : (
          <Link href="/auth">Login</Link>
        )}
      </Flex>
    </Box>
  );
}
