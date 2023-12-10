//import Box from Chakra
import React from "react";
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

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

import { Input, IconButton } from "@chakra-ui/react";

export default function NavBar() {
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
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Account</DrawerHeader>
          {/* INSERT ICON IMAGE ASSOCIATED WITH ICON */}
          <DrawerBody>
            <Box>
              <Flex flexDir="column">
                <Box>
                  <Flex flexDir="column" padding-bottom="5px">
                    <Heading fontSize="medium">Welcome, NAME</Heading>
                  </Flex>
                </Box>
                <Box>
                  <Flex flexDir="column">
                    <Text>Search users or groups</Text>
                    {/* SEARCH BAR FUNCTIONALITY - INSERT TUCKER's STUFF */}
                    <Box>
                      <Flex>
                        <Input type="search" id="site-search" name="q" />
                        <IconButton
                          icon={<SearchIcon />}
                          colorScheme="teal"
                          variant="solid"
                          aria-label="Search user or group"
                        />
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
                <Box>
                  <Flex>
                    <ChakraLink as={ReactRouterLink} to="/private/groups">
                      Groups
                    </ChakraLink>
                  </Flex>
                </Box>
                <Box>
                  <Flex>
                    <ChakraLink
                      as={ReactRouterLink}
                      to="/private/purchaseditems"
                    >
                      Purchased Items for Others
                    </ChakraLink>
                  </Flex>
                </Box>
                {/* <Box>
                  <Flex flexDir="column" padding-bottom="5px"> */}
                {/* <Menu>
                      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        MyGroups Section
                      </MenuButton>
                      <MenuList>
                        <MenuItem>
                          <ChakraLink as={ReactRouterLink} to="/profile/groups">
                            Group A
                          </ChakraLink>
                        </MenuItem>
                        <MenuItem>
                          <ChakraLink as={ReactRouterLink} to="/profile/groups">
                            Group A
                          </ChakraLink>

                        </MenuItem>
                        <MenuItem>
                          <ChakraLink as={ReactRouterLink} to="/profile/groups">
                            Group A
                          </ChakraLink>

                        </MenuItem>
                      </MenuList>
                    </Menu> */}
                {/* </Flex>
                </Box> */}
                <Box>
                  <Flex
                    flexDir="row"
                    align="center"
                    justifyContent="center"
                    padding="10px"
                  >
                    <Button colorScheme="teal">Logout</Button>
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
