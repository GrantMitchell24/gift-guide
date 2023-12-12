//import Box from Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { UserTable } from "../components";

import { AddItem, DeleteItem, UpdateItem } from "../components";
import { EmailAlert } from "../components";

export default function WishListPage() {
  return (
    <>
      <Box m="10px">
        <Flex flexDir="column" scrollBehavior="smooth">
          <Heading>Wish List</Heading>
        </Flex>
        <Box>
          <Flex margin="10px" flexDir="row" justifyContent="space-between">
            <Box>
              <Flex flexDir="row">
                <AddItem />
              </Flex>
            </Box>
            <Box>
              <Flex flexDir="row">
                <DeleteItem />
              </Flex>
            </Box>
            <Box>
              <Flex flexDir="row">
                <UpdateItem />
              </Flex>
            </Box>
          </Flex>
        </Box>
        <UserTable />
      </Box>
      <Box>
        <Flex flexDir="row" alignItems="center">
          <EmailAlert />
        </Flex>
      </Box>
    </>
  );
}
