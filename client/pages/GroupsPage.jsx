// Import React
import React from "react";
import { useState, useEffect } from "react";

// Import useAppCtx
import { useAppCtx } from "../utils/AppProvider";

// Import Components
import { InviteTable, CustomModal } from "../components";

//Import Flex and Spacer
import { Flex, Spacer } from "@chakra-ui/react";

//import GridItem for table responsiveness
import { Grid, GridItem } from "@chakra-ui/react";

// Chakra Imports
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Box, Heading, useDisclosure, Tooltip } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Table,
  Button,
  Input,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
} from "@chakra-ui/react";
import { ListItem, OrderedList } from "@chakra-ui/react";

// Chakra Icons
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

// //Import CSS styling for table mobile responsiveness
// import "../assets/css/tablegroups";

export default function GroupsPage(props) {
  // Needed for default Modals, CustomModal shouldn't need this???
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // Bring color pallet in from props
  const colorPallet = props.colorPallet;

  //----------------------------------------------------------------------
  // Handles User Info - Especially needed when we need to update a table
  //----------------------------------------------------------------------

  // Bring in logged in user info
  const { user } = useAppCtx();

  // Set user info to null
  const [userInfo, setUserInfo] = useState({});

  // Fetch most recent user info
  async function getUserInfo() {
    const query = await fetch(`/api/user/${user._id}`);
    const result = await query.json();
    const payload = result.payload;
    setUserInfo(payload);
  }

  //------------------------------------------------------------
  // Handles Creating A Group
  //------------------------------------------------------------
  const defaultGroupName = { title: "", admin_id: "" };
  const [newGroupName, setNewGroupName] = useState(defaultGroupName);

  function handleNewGroupInputChange(e) {
    const clone = { ...newGroupName, [e.target.name]: e.target.value };
    setNewGroupName(clone);
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
      getUserInfo();
      onClose();
    } catch (err) {
      console.log(err.message);
    }
  }

  //------------------------------------------------------------
  // Handles inviting a member by username to a group
  //------------------------------------------------------------

  const defaultInvitedUser = { username: "" };
  const [invitedUser, setinvitedUser] = useState(defaultInvitedUser);

  const [inviteGroupId, setInviteGroupId] = useState(null);

  function handleNewInviteInputChange(e) {
    const clone = { ...invitedUser, [e.target.name]: e.target.value };
    setinvitedUser(clone);
  }

  async function invitBtn(groupId) {
    try {
      console.log(invitedUser);
      const invitedUserInfo = await fetch(
        `/api/user/username/${invitedUser.username}`
      );
      const invitedUserInfoUnpacked = await invitedUserInfo.json();
      console.log(invitedUserInfoUnpacked);

      const query = await fetch(
        `/api/group/invite/${groupId}/${invitedUserInfoUnpacked.payload._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Btn Clicked");
      setinvitedUser(defaultInvitedUser);
      setInviteGroupId(null);
    } catch (err) {
      console.log(err.message);
    }
  }

  //------------------------------------------------------------
  // Handles Deleting A Group
  //------------------------------------------------------------

  const [deleteGroup, setDeleteGroup] = useState(null);

  async function deleteBtn(groupId) {
    try {
      await fetch(`/api/group/${groupId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getUserInfo();
      setDeleteGroup(null);
    } catch (err) {
      console.log(err.message);
    }
  }
  //------------------------------------------------------------

  useEffect(() => {
    if (user._id) {
      // Updates newGroupName to include the user's id so if they make a new group, they become the admin
      const clone = { ...newGroupName, admin_id: user._id };
      setNewGroupName(clone);
      // Grab user information so we know what groups they're in
      getUserInfo();
    }
  }, [user]);

  if (!user || !userInfo) return <></>;

  return (
    <Center
      bgImage="url(/assets/images/joanna-kosinska-0CQfTLOVTPU-unsplash.jpg)"
      bgSize="cover"
      bgRepeat="no-repeat"
      minH="80vh"
    >
      {/* -----------------------------------
        Calls in the "InviteTable" Component
      ---------------------------------------*/}
      <Box p="20px">
        {userInfo.pending_groups && (
          <>
            <Heading pb="20px" color={colorPallet.c1}>
              You Have Group Invites!
            </Heading>
            <InviteTable
              colorPallet={colorPallet}
              userInfo={userInfo}
              getUserInfo={getUserInfo}
            />
          </>
        )}

        {/* -----------------------------------
            Add Group Button and Modal
          ---------------------------------------*/}
        <Heading pb="20px" color={colorPallet.c1}>
          My Groups
        </Heading>

        <Box>
          <Button
            onClick={onOpen}
            backgroundColor={colorPallet.c2}
            color="white"
            _hover={{ backgroundColor: colorPallet.c1 }}
            mb="20px"
          >
            New Group +
          </Button>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create a New Group</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Group Name</FormLabel>
                  <Input
                    ref={initialRef}
                    onChange={handleNewGroupInputChange}
                    name="title"
                    type="text"
                    value={newGroupName.title}
                    placeholder="Group name"
                    borderColor={colorPallet.c2}
                    focusBorderColor={colorPallet.c3}
                    _hover={{ borderColor: colorPallet.c3 }}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={createGrpBtn}
                  backgroundColor={colorPallet.c1}
                  color="white"
                  _hover={{ backgroundColor: colorPallet.c2 }}
                  mr={3}
                >
                  Create Group
                </Button>
                <Button onClick={onClose} backgroundColor={colorPallet.c4}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        {/* -----------------------------------
            My Group Table - Table Headers
        ---------------------------------------*/}
        <Box>
          <Flex>
            <TableContainer
              className="table-groups"
              border={`solid 2px ${colorPallet.c1}`}
              borderRadius={"15px"}
            >
              <Table variant="striped" backgroundColor={colorPallet.c4}>
                <Thead>
                  <Tr>
                    <Th> Group Name </Th>
                    <Th> Admin </Th>
                    <Th> Group Members </Th>
                    <Th> </Th>
                    <Th> </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* -----------------------------------
              Table Rows
              ----------------------------------- */}

                  {userInfo.groups &&
                    userInfo.groups.map((group, key) => {
                      return (
                        <Tr key={key}>
                          <Td>{group.title}</Td>
                          <Td color={colorPallet.c1}>
                            <a href={`/wishlist/${group.admin_id._id}`}>
                              {group.admin_id.username}
                            </a>
                          </Td>
                          <Td color={colorPallet.c1}>
                            <OrderedList>
                              {group.group_members.map((group_member, key) => {
                                return (
                                  <ListItem key={key} py="3px">
                                    <a href={`/wishlist/${group_member._id}`}>
                                      {group_member.username}
                                    </a>
                                  </ListItem>
                                );
                              })}
                            </OrderedList>
                          </Td>

                          {/* -------------------------------------------------
                          Add User to Group Btn Modal
                     ----------------------------------------------------*/}
                          {user._id === group.admin_id._id ? (
                            <Td p="0px">
                              <Center>
                                <Tooltip hasArrow label="Invite User">
                                  <Box>
                                    <Button
                                      onClick={() =>
                                        setInviteGroupId(group._id)
                                      }
                                      p="0px"
                                    >
                                      <AddIcon
                                        boxSize={"30px"}
                                        color={"#fff"}
                                        backgroundColor={colorPallet.c3}
                                        p="8px"
                                        borderRadius="5px"
                                      />
                                    </Button>

                                    <CustomModal
                                      title="Invite User to Group"
                                      isOpen={inviteGroupId !== null}
                                      onClose={() => setInviteGroupId(null)}
                                    >
                                      <FormControl>
                                        <FormLabel>Username</FormLabel>

                                        <Input
                                          ref={initialRef}
                                          onChange={handleNewInviteInputChange}
                                          name="username"
                                          type="text"
                                          value={invitedUser.username}
                                          placeholder="Username"
                                          borderColor={colorPallet.c2}
                                          focusBorderColor={colorPallet.c3}
                                          _hover={{
                                            borderColor: colorPallet.c3,
                                          }}
                                        />
                                      </FormControl>
                                      <Button
                                        onClick={() => invitBtn(inviteGroupId)}
                                        backgroundColor={colorPallet.c1}
                                        color="white"
                                        _hover={{
                                          backgroundColor: colorPallet.c2,
                                        }}
                                        mr={3}
                                      >
                                        Invite to Group
                                      </Button>
                                      <Button
                                        onClick={() => setInviteGroupId(null)}
                                        backgroundColor={colorPallet.c4}
                                      >
                                        Cancel
                                      </Button>
                                    </CustomModal>
                                  </Box>
                                </Tooltip>
                              </Center>
                            </Td>
                          ) : (
                            <Td></Td>
                          )}
                          {user._id === group.admin_id._id ? (
                            <Td p="0px">
                              <Center>
                                <Tooltip hasArrow label="Delete Group">
                                  <Box>
                                    <Button
                                      onClick={() => setDeleteGroup(group._id)}
                                      p="0px"
                                    >
                                      <DeleteIcon
                                        boxSize={"30px"}
                                        color={"#fff"}
                                        backgroundColor={colorPallet.c5}
                                        p="8px"
                                        borderRadius="5px"
                                      />
                                    </Button>

                                    <CustomModal
                                      title="Deleting Group"
                                      isOpen={deleteGroup !== null}
                                      onClose={() => setDeleteGroup(null)}
                                    >
                                      <FormControl>
                                        <FormLabel>
                                          Are you sure you want to delete this
                                          group?
                                        </FormLabel>
                                      </FormControl>
                                      <Button
                                        onClick={() => deleteBtn(deleteGroup)}
                                        backgroundColor={colorPallet.c1}
                                        color="white"
                                        _hover={{
                                          backgroundColor: colorPallet.c2,
                                        }}
                                        mr={3}
                                      >
                                        Yes
                                      </Button>
                                      <Button
                                        onClick={() => setDeleteGroup(null)}
                                        backgroundColor={colorPallet.c4}
                                      >
                                        No
                                      </Button>
                                    </CustomModal>
                                  </Box>
                                </Tooltip>
                              </Center>
                            </Td>
                          ) : (
                            <Td></Td>
                          )}
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Box>
      </Box>
    </Center>
  );
}
