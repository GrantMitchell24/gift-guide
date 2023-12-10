//import Box from Chakra
import React from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'


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

import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'

import { Input, IconButton } from "@chakra-ui/react";

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Navigation
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
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <Text>Search users or groups</Text>
            <Input type="search" id="site-search" name="q" />
            <IconButton icon={<SearchIcon />} colorScheme='teal' variant='solid' aria-label="Search user or group" />
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                MyGroups Section
              </MenuButton>
              <MenuList>
                <MenuItem>Group A</MenuItem>
                <MenuItem>Group A</MenuItem>
                <MenuItem>Group C</MenuItem>
              </MenuList>
            </Menu>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
