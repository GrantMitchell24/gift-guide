import React from "react";
import { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppProvider";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
// Chakra Imports
import { Box, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {
  Table,
  Button,
  Input,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

export default function GroupsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  // Bring in logged in user info
  const { user } = useAppCtx()


  const defaultGroupName = { title: "", admin_id: "" }
  const [newGroupName, setNewGroupName] = useState(defaultGroupName)

  function handleInputChange(e) {
    // console.log(e.target.name)
    // console.log(e.target.value)

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


  useEffect(() => {
    if( user._id ){
      const clone = { ...newGroupName, admin_id: user._id }
      setNewGroupName(clone)
    }
  }, [user])

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
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Group Name</Th>
              <Th>Admin </Th>
              <Th> Group Members </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Group B</Td>
              <Td></Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>Group C</Td>
              <Td></Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Group D</Td>
              <Td></Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Group E</Th>
              <Th></Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  )
}