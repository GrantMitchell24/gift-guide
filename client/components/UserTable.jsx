import { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppProvider";
import { useParams } from "react-router-dom";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import React from "react";
import { AddIcon, DeleteIcon, CheckIcon, ExternalLinkIcon } from '@chakra-ui/icons'

import { Button, ButtonGroup, Box, Image } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Heading, Flex, Spacer, Center } from '@chakra-ui/react'

// Import Components
import { CustomModal, UpdateItem } from "../components";

// Just another Chakra import
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export default function UserTable(props) {

  // Bring color pallet in from props
  const colorPallet = props.colorPallet


  const { user } = useAppCtx();

  const params = useParams();
  // console.log(params);

  const [userData, setUserData] = useState();

  // Fetch most recent user info
  async function getUserInfo() {
    const query = await fetch(`/api/user/${params.userId}`);
    const result = await query.json();
    const payload = result.payload;
    // console.log(payload);
    setUserData(payload);
  }
  // console.log(userData);

  //DELETE ROUTE"/:userId/item/:itemId"
  async function deleteItem(itemId) {
    const query = await fetch(`/api/user/${params.userId}/item/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await query.json();
    const payload = result.payload;
    setUserData(payload);
  }


  //------------------------------------------------------------
  // Handles Purchasing a Gift
  //------------------------------------------------------------

  const [purchaseModal, setPurchaseModal] = useState(null)


  async function purchaseBtn(itemId) {
    try {
      await fetch(`/api/user/${params.userId}/item/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({ purchased: true }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      getUserInfo()
      setPurchaseModal(null)
    } catch (err) {
      console.log(err.message)
    }
  }


  useEffect(() => {
    if (user._id) {
      getUserInfo();
    }
  }, [user]);

  if (!userData) return <></>;

  return (
    <div className="UserTable">
      <TableContainer border={`solid 2px ${colorPallet.c1}`} borderRadius={"15px"}>
        <Table variant='striped' backgroundColor={colorPallet.c4}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Wish Rank</Th>
              <Th>Cost ($)</Th>
              <Th>Notes</Th>
              <Th>Link</Th>
              {/* Only showes if user is on their own wish list */}
              {user._id === userData._id && <Th>Update</Th>}
              {user._id === userData._id && <Th>Delete</Th>}
              {/* Only showes if on someone else's wishlist */}
              {user._id != userData._id && <Th>Purchased</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {userData.items.map((val, key) => {
              return (
                <Tr key={key} value={val._id}>
                  <Td>{val.name}</Td>
                  <Td>{val.wishRank}</Td>
                  <Td>{val.cost}</Td>
                  <Td>{val.notes}</Td>
                  {val.link &&
                    <Td><a href={val.link} target="_blank"><ExternalLinkIcon fontSize="24px" color={colorPallet.c1} /></a></Td>
                  }
                  {!val.link &&
                    <Td></Td>
                  }


                  {user._id === userData._id && (
                    <>
                      {/* Only showes if user is on their own wish list */}
                      {/* Update Info Btn */}
                      <Td>
                        <UpdateItem 
                          colorPallet={colorPallet} 
                          itemInfo={val} 
                          getUserInfo={getUserInfo}
                          // setUserData={setUserData}
                        />
                      </Td>


                      {/* Delete/Purchased Btns */}
                      <Td>
                        <Button
                          p="0px"
                          onClick={() => deleteItem(val._id)}
                        >
                          <DeleteIcon boxSize={"30px"} color={"#fff"} backgroundColor={colorPallet.c5} p="8px" borderRadius="5px" />
                        </Button>
                      </Td>
                    </>
                  )}



                  {user._id != userData._id && (
                    <>
                      {/* Delete/Purchased Btns */}
                      <Td>

                        {val.purchased === false &&
                          <Center>
                            <Button
                              onClick={() => setPurchaseModal(val._id)}
                              p="0px">
                              <Box
                                boxSize={"30px"}
                                color={"#fff"}
                                backgroundColor={colorPallet.c2}
                                _hover={{ backgroundColor: colorPallet.c1 }}
                                borderRadius="5px"
                                p="4px"
                              >
                                <Image color="#fff" src="/assets/icons/presentIcon.png" alt="Icon of a present" />
                              </Box>
                            </Button>
                            <CustomModal
                              isOpen={purchaseModal !== null}
                              onClose={() => setPurchaseModal(null)}
                            >
                              <FormControl>
                                <Heading
                                  color={colorPallet.c1}
                                  fontSize="1.8rem">
                                  Purchasing Gift
                                </Heading>
                                <FormLabel
                                  py="20px"
                                  color={colorPallet.c1}>
                                  Would you like to mark this gift as purchased?
                                </FormLabel>
                              </FormControl>
                              <Flex>
                                <Button
                                  onClick={() => purchaseBtn(purchaseModal)}
                                  backgroundColor={colorPallet.c2}
                                  color="white"
                                  _hover={{ backgroundColor: colorPallet.c3 }}
                                  mr={3}>
                                  Yes
                                </Button>
                                <Spacer />
                                <Button
                                  onClick={() => setPurchaseModal(null)}
                                  backgroundColor={colorPallet.c4}
                                >
                                  Cancel
                                </Button>
                              </Flex>
                            </CustomModal>
                          </Center>
                        }
                        {val.purchased === true &&
                          <Center>
                            <CheckIcon color={colorPallet.c1} />
                          </Center>
                        }



                      </Td>
                    </>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
