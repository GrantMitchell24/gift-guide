//import Box from Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { UserTable } from "../components";

import { AddItem } from "../components";

export default function WishListPage() {
  return (
    <>
      <Box m="10px">
        <Flex flexDir="column" scrollBehavior="smooth">
          <Heading>Wish List</Heading>
        </Flex>
        <AddItem />
        <UserTable />
      </Box>
    </>
  );
}
