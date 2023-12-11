//import Box from Chakra

import React from "react";
import SearchBar from "./SearchBar";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { ChevronDownIcon, SearchIcon, HamburgerIcon } from "@chakra-ui/icons";

import { Input, IconButton } from "@chakra-ui/react";

import { Divider } from "@chakra-ui/react";

import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

export default function NavBar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent {...props}>
          <DrawerCloseButton />
          <DrawerHeader>
            <ChakraLink as={ReactRouterLink} to="/account">
              Account
            </ChakraLink>
          </DrawerHeader>
          <DrawerBody>
            <Box>
              <Flex flexDir="column">
                <Box>
                  <Flex
                    flexDir="column"
                    padding-bottom="5px"
                    justifyContent="space-evenly"
                  >
                    <Heading fontSize="medium">Welcome, NAME </Heading>
                  </Flex>
                </Box>
                <Divider orientation="horizontal" />
                <Box>
                  <Flex flexDir="column" justifyContent="space-evenly">
                    <Text>Search users below:</Text>
                    {/* TUCKERS CODE for Searchbar below lines 72-77 */}
                    {/* <Box className="App">
                      <SearchBar
                        placeholder="Enter user"
                        // data={UserData}
                      />
                    </Box> */}
                    {/* <Divider orientation="horizontal" /> */}
                    <Box>
                      <Flex>
                        <SearchBar />
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
                <Divider orientation="horizontal" />
                <Box>
                  <Flex flexDir="column" justifyContent="space-evenly">
                    <ChakraLink as={ReactRouterLink} to="/mygroups">
                      Groups
                    </ChakraLink>
                  </Flex>
                </Box>
                <Divider orientation="horizontal" />
                <Box>
                  <Flex flexDir="column" justifyContent="space-evenly">
                    <ChakraLink as={ReactRouterLink} to="/private/purchased">
                      Purchased Items
                    </ChakraLink>
                  </Flex>
                </Box>
                <Divider orientation="horizontal" />
                {/* 
                <Box>
                  <Flex flexDir="column" justifyContent="space-evenly">
                    <ChakraLink as={ReactRouterLink} to="/private/favorites">
                      Favorites
                    </ChakraLink>
                  </Flex>
                </Box> */}
                <Divider orientation="horizontal" />
                <Box>
                  <Flex
                    flexDir="row"
                    align="center"
                    justifyContent="center"
                    padding="10px"
                  >
                    <Button colorScheme="teal">
                      <ChakraLink as={ReactRouterLink} to="/logout">
                        Logout
                      </ChakraLink>
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
