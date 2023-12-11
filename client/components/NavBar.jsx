//import Box from Chakra

import React from "react"
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

import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

import { Input, IconButton } from "@chakra-ui/react";

import { Divider } from "@chakra-ui/react";

export default function NavBar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Page Navigation
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
          {/* INSERT ICON IMAGE ASSOCIATED WITH ICON */}
          <DrawerBody>
            <Box>
              <Flex flexDir="column">
                <Box>
                  <Flex
                    flexDir="column"
                    padding-bottom="5px"
                    justifyContent="space-evenly"
                  >
                    <Heading fontSize="medium">Your Gift Guide</Heading>
                  </Flex>
                </Box>
                <Divider orientation="horizontal" />
                <Box>
                  <Flex flexDir="column" justifyContent="space-evenly">
                    <Text>Search users</Text>
                     <Box className="App">
                       <SearchBar 
                        placeholder="Enter user" 
                        // data={UserData} 
                      />
                     </Box>
                    <Divider orientation="horizontal" />
                    <Box>
                      <Flex>
                        <Input type="search" id="site-search" name="q" />
                        <IconButton
                          icon={<SearchIcon />}
                          colorScheme="teal"
                          variant="solid"
                          aria-label="Search user"
                        />
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

                <Box>
                  <Flex flexDir="column" justifyContent="space-evenly">
                    <ChakraLink as={ReactRouterLink} to="/private/favorites">
                      Favorites
                    </ChakraLink>
                  </Flex>
                </Box>
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
