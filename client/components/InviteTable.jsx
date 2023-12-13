import { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppProvider";
import { useParams } from "react-router-dom";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

import { Button, ButtonGroup } from "@chakra-ui/react";

// Just another Chakra import
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Center } from "@chakra-ui/react"

import { CheckIcon, CloseIcon } from '@chakra-ui/icons'



export default function InviteTable(props) {

  // Bring in color pallet
  const colorPallet = props.colorPallet

  // Bring in user info
  const userInfo = props.userInfo

  // Allow user to accept group invite
  async function handleAcceptClick(groupId) {
    try {
      const query = await fetch(`api/group/${groupId}/${userInfo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
      props.getUserInfo()
    } catch (err) {
      console.log(err.message)
    }
  }

  // Allow user to decline group invite
  async function handleDeclineClick(groupId) {
    try {
      const query = await fetch(`api/group/invite/${groupId}/${userInfo._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      props.getUserInfo()
    } catch (err) {
      console.log(err.message)
    }
  }


  if (!userInfo) return <></>

  return (
    <>
      <TableContainer mb="30px" border={`solid 2px ${colorPallet.c1}`} borderRadius={"15px"}>
        <Table variant='striped' backgroundColor="#CBD5E0">
          <Thead>
            <Tr>
              <Th>Group Name</Th>
              <Th>Admin Name</Th>
              <Th width="40px"><Center>Accept</Center></Th>
              <Th width="40px"><Center>Reject</Center></Th>
            </Tr>
          </Thead>
          <Tbody>


            {props.userInfo.pending_groups.map((pending_group, key) => {
              return (

                <Tr key={key}>
                  <Td >{pending_group.title}</Td>
                  <Td >{pending_group.admin_id.username}</Td>
                  <Td >
                    <Center>
                      <Button p="0px" onClick={() => handleAcceptClick(pending_group._id)}>
                        <CheckIcon boxSize={"30px"} color={"#fff"} backgroundColor={colorPallet.c3} p="8px" borderRadius="5px" />
                      </Button>
                    </Center>
                  </Td>
                  <Td >
                    <Center>
                      <Button p="0px" onClick={() => handleDeclineClick(pending_group._id)}>
                        <CloseIcon boxSize={"30px"} color={"#fff"} backgroundColor={colorPallet.c5} p="8px" borderRadius="5px" />
                      </Button>
                    </Center>
                  </Td>
                </Tr>
              )


            })}




          </Tbody>
        </Table>
      </TableContainer>



    </>
  )
}