import { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppProvider";
import { useParams } from "react-router-dom";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

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

export default function UserTable() {
  const { user } = useAppCtx();

  const params = useParams();

  const [userData, setUserData] = useState();

  // Fetch most recent user info
  async function getUserInfo() {
    const query = await fetch(`/api/user/${params.userId}`);
    const result = await query.json();
    const payload = result.payload;
    console.log(payload);
    setUserData(payload);
  }
  console.log(userData);

  async function onClick() {
    console.log("This has been clicked!");
    window.location.reload();
  }

  useEffect(() => {
    if (user._id) {
      getUserInfo();
    }
  }, [user]);

  if (!userData) return <></>;

  return (
    <div className="UserTable">
      <TableContainer>
        <Table variant="striped">
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
                <Tr key={key}>
                  <Td>{val.name}</Td>
                  <Td>{val.wishRank}</Td>
                  <Td>{val.cost}</Td>
                  <Td>{val.notes}</Td>
                  {user._id === userData._id && (
                    <Td>
                      <Button colorScheme="teal" onClick={onClick}>
                        Delete
                      </Button>
                    </Td>
                  )}
                  {user._id != userData._id && (
                    <Td>
                      <Checkbox colorScheme="teal">Purchased</Checkbox>
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
