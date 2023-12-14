// Import React
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

// Import Components
import SearchBar from "./SearchBar";

//Import Chakra
import { Box, Flex, Text, textDecoration } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";

// Import Chakra Icons
import { HamburgerIcon } from "@chakra-ui/icons";
import { Divider, Image, Center } from "@chakra-ui/react";
import { useAppCtx } from "../utils/AppProvider";


export default function NavBar(props) {
  // Bring color pallet in from props
  const colorPallet = props.colorPallet

  // Modal defaults
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

                {/* ACCOUNT */}
                <Box py="5px">
                  <Flex flexDir="column" fontSize="1.3rem"  _hover={{ textDecoration: "underline" }}>
                    <a href={`/account`}>
                      Account
                    </a>
                  </Flex>
                </Box>

                <Divider orientation="horizontal" borderColor={colorPallet.c2} />

                {/* WISHLIST */}
                <Box py="5px">
                  <Flex flexDir="column" justifyContent="space-evenly" fontSize="1.3rem"  _hover={{ textDecoration: "underline" }}>
                    <a href={`/wishlist/${user._id}`}>
                      Wish List
                    </a>
                  </Flex>
                </Box>

                <Divider orientation="horizontal" borderColor={colorPallet.c2} />

                {/* GROUPS */}
                <Box py="5px">
                  <Flex flexDir="column" justifyContent="space-evenly" fontSize="1.3rem" _hover={{ textDecoration: "underline" }}>
                    <a href={`/mygroups`}>
                      Groups
                    </a>
                  </Flex>
                </Box>

                <Divider orientation="horizontal" borderColor={colorPallet.c2} />

                {/* SEARCH BAR */}
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

                <Divider orientation="horizontal" borderColor={colorPallet.c2} border="2px" />

                {/* LOGOUT */}
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
