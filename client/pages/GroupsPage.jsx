import React from "react";
import { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppProvider";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
// Chakra Imports
import { Box, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { Table, Button, Input, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Center } from '@chakra-ui/react'
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'

export default function GroupsPage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  // Bring in logged in user info
  const { user } = useAppCtx()

  // Set user info to null
  const [userInfo, setUserInfo] = useState({})

  // Fetch most recent user info
  async function getUserInfo() {
    const query = await fetch(`/api/user/${user._id}`)
    const result = await query.json()
    const payload = result.payload
    setUserInfo(payload)
    console.log(payload)
  }

  // Bring color pallet in from props
  const colorPallet = props.colorPallet

  //------------------------------------------------------------
  // Handle Creating A Group
  //------------------------------------------------------------
  const defaultGroupName = { title: "", admin_id: "" }
  const [newGroupName, setNewGroupName] = useState(defaultGroupName)

  function handleInputChange(e) {
    const clone = { ...newGroupName, [e.target.name]: e.target.value }
    setNewGroupName(clone)
  }

  async function createGrpBtn() {
    try {
      const query = await fetch("/api/group", {
        method: "POST",
        body: JSON.stringify(newGroupName),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await query.json();
      onClose()
    } catch (err) {
      console.log(err.message);
    }
  }
  //------------------------------------------------------------


  useEffect(() => {
    if (user._id) {
      // Updates newGroupName to include the user's id so if they make a new group, they become the admin
      const clone = { ...newGroupName, admin_id: user._id }
      setNewGroupName(clone)
      // Grab user information so we know what groups they're in
      getUserInfo()
    }
  }, [user])


  if (!user || !userInfo) return <></>

  return (
    <>
      <Box>
        <Button onClick={onOpen}>New Group +</Button>


        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Group Name</FormLabel>
                <Input ref={initialRef} onChange={handleInputChange} name="title" type="text" value={newGroupName.title} placeholder='First name' />
              </FormControl>

            </ModalBody>

            <ModalFooter>
              <Button onClick={createGrpBtn} colorScheme='blue' mr={3}>
                Create Group
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </Box>
      <TableContainer>
        <h2> My Groups </h2>
        <Table variant='striped' backgroundColor="#CBD5E0">
          <Thead>
            <Tr>
              <Th> Group Name </Th>
              <Th> Admin </Th>
              <Th> Group Members </Th>
              <Th width="40px"> </Th>
              <Th width="40px"> </Th>
            </Tr>
          </Thead>
          <Tbody>
            {userInfo.groups &&
              userInfo.groups.map((val, key) => {
                return (
                  <Tr key={key}>
                    <Td>{val.title}</Td>
                    <Td color={colorPallet.c1}><a href={`/wishlist/${val.admin_id._id}`}>{val.admin_id.username}</a></Td>
                    <Td color={colorPallet.c1}>
                      <OrderedList>
                        {val.group_members.map((val, key) => {
                          return (
                            <ListItem key={key} py="3px"><a href={`/wishlist/${val._id}`}>{val.username}</a></ListItem>
                          )
                        })}
                      </OrderedList>
                    </Td>

                    {user._id === val.admin_id._id
                      ? <Td p="0px"> <Center><Tooltip hasArrow label='Invite User'><AddIcon boxSize={"30px"} color={"#fff"} backgroundColor={colorPallet.c3} p="8px" borderRadius="5px" /></Tooltip></Center> </Td>
                      : <Td></Td>
                    }
                    {user._id === val.admin_id._id
                      ? <Td p="0px"> <Center><Tooltip hasArrow label='Delete Group'><DeleteIcon boxSize={"30px"} color={"#fff"} backgroundColor={colorPallet.c5} p="8px" borderRadius="5px" /></Tooltip></Center> </Td>
                      : <Td></Td>
                    }

                  </Tr>
                )
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}