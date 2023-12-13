//import Box from Chakra

import React from "react";
import SearchBar from "./SearchBar";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

// //import in useLocation from react router dom to use in the template literal
// import { Link, useLocation } from "react-router-dom";

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
// import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { ChevronDownIcon, SearchIcon, HamburgerIcon } from "@chakra-ui/icons";

import { Input, IconButton } from "@chakra-ui/react";

import { Divider, Image, Center } from "@chakra-ui/react";

import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

import { useParams } from "react-router-dom";

import { useAppCtx } from "../utils/AppProvider";

export default function NavBar(props) {
  // Bring color pallet in from props
  const colorPallet = props.colorPallet

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // Bring in logged in user info
  const { user } = useAppCtx();

  return (
    <>
      <Button ref={btnRef} backgroundColor={colorPallet.c5} _hover={{ backgroundColor: "#9B2C2C" }} onClick={onOpen}>
        <HamburgerIcon color="#fff" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent {...props}
          color={colorPallet.c1}
        // backgroundColor={colorPallet.c4}
        >
          <DrawerCloseButton />
          <DrawerHeader p="16px 24px 0px 24px">
            <Box>
              <Center>
                <a href="/"><Image width="7rem" src={"/assets/images/Giftify.png"} alt='logo' pb="10px" /></a>
              </Center>
            </Box>
          </DrawerHeader>
          <DrawerBody>
            <Box>
              <Flex flexDir="column">

                <Divider orientation="horizontal" borderColor={colorPallet.c2} border="2px" />

                <Box py="5px">
                  <Flex flexDir="column">
                    <ChakraLink as={ReactRouterLink} to="/account" fontSize="1.3rem">
                      Account
                    </ChakraLink>
                  </Flex>
                </Box>

                <Divider orientation="horizontal" borderColor={colorPallet.c2} />

                <Box py="5px">
                  <Flex flexDir="column" justifyContent="space-evenly">
                    <ChakraLink
                      as={ReactRouterLink}
                      to={`/wishlist/${user._id}`}
                      fontSize="1.3rem"
                    >
                      Wishlist
                    </ChakraLink>
                  </Flex>
                </Box>

                <Divider orientation="horizontal" borderColor={colorPallet.c2} />

                <Box py="5px">
                  <Flex flexDir="column" justifyContent="space-evenly">
                    <ChakraLink as={ReactRouterLink} to="/mygroups" fontSize="1.3rem">
                      Groups
                    </ChakraLink>
                  </Flex>
                </Box>

                <Divider orientation="horizontal" borderColor={colorPallet.c2} />

                <Box py="5px">
                  <Flex flexDir="column">
                    <Box>
                      <Flex flexDir="row">
                        <Text fontSize="1.3rem">Search for Wishlist:</Text>
                      </Flex>
                    </Box>
                    <Box>
                      <Flex>
                        <SearchBar colorPallet={colorPallet} />
                      </Flex>
                    </Box>
                  </Flex>
                </Box>

                {/* <Divider orientation="horizontal" borderColor={colorPallet.c2} />

                <Box py="5px">
                  <Flex flexDir="column" justifyContent="space-evenly">
                    <ChakraLink as={ReactRouterLink} to="/private/purchased" fontSize="1.3rem">
                      Purchased Items
                    </ChakraLink>
                  </Flex>
                </Box> */}

                {/* <Divider orientation="horizontal" borderColor={colorPallet.c2} /> */}

                {/* 
                <Box>
                  <Flex flexDir="column" justifyContent="space-evenly">
                    <ChakraLink as={ReactRouterLink} to="/private/favorites">
                      Favorites
                    </ChakraLink>
                  </Flex>
                </Box> */}

                <Divider orientation="horizontal" borderColor={colorPallet.c2} border="2px" />

                <Box>
                  <Flex
                    flexDir="row"
                    align="center"
                    justifyContent="center"
                    padding="10px"
                  >
                    <ChakraLink as={ReactRouterLink} to="/logout">
                      <Button backgroundColor={colorPallet.c5} color="white" _hover={{ backgroundColor: "#9B2C2C" }} mr={3}>
                        Logout
                      </Button>
                    </ChakraLink>
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
