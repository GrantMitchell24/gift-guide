import { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppProvider";
import { useParams } from "react-router-dom";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import React from "react";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

import { Button, ButtonGroup } from "@chakra-ui/react";

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
    console.log(payload);
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

  //making a useState case with the checkbox and purchased property in the Item Model
  const [checkedItems, setCheckedItems] = useState({ purchased: false });

  // const allChecked = checkedItems.every(Boolean);
  // const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  //PURCHASED ROUTE"/:userId/item/:itemId"
  async function purchasedItem(itemId) {
    const payload = checkedItems;
    try {
      const query = await fetch(`/api/user/${params.userId}/item/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({ purchased: "true" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Might be able to delete this line of code since we aren't using the response
      const response = await query.json();
    } catch (err) {
      console.log(err.message);
    }
    setUserData(payload);
    // console.log(payload);
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
              <Th>Cost</Th>
              <Th>Notes</Th>
              {user._id === userData._id && <Th>Delete</Th>}
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
                  {user._id === userData._id && (
                    <Td>
                      <Button
                        p="0px"
                        onClick={() => deleteItem(val._id)}
                      >
                        <DeleteIcon boxSize={"30px"} color={"#fff"} backgroundColor={colorPallet.c5} p="8px" borderRadius="5px" />
                      </Button>
                    </Td>
                  )}
                  {user._id != userData._id && (
                    <Td>


                      {/* <Box>
                        <Button onClick={() => setDeleteGroup(group._id)} p="0px"><Image href="/assets/icons/presentIcon.png" boxSize={"30px"} color={"#fff"} backgroundColor={colorPallet.c5} p="8px" borderRadius="5px" /></Button>

                        <CustomModal title="Deleting Group" isOpen={deleteGroup !== null} onClose={() => setDeleteGroup(null)}>
                          <FormControl>
                            <FormLabel>Are you sure you want to delete this group?</FormLabel>
                          </FormControl>
                          <Button
                            onClick={() => deleteBtn(deleteGroup)}

                            backgroundColor={colorPallet.c1} color="white" _hover={{ backgroundColor: colorPallet.c2 }} mr={3}>
                            Yes
                          </Button>
                          <Button onClick={() => setDeleteGroup(null)} backgroundColor={colorPallet.c4}>No</Button>
                        </CustomModal>
                      </Box> */}





                    </Td>
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
