//import Box from Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { NavBar } from "../components";
import PurchasedItems from "../components/PurchasedItems";

export default function PurchasedPage() {
  return (
    <>
      <Box m="10px">
        <Flex flexDir="column">
          <Box>
            <Flex>
              <Heading>Account Page - Purchased Items</Heading>
            </Flex>
          </Box>
          <Box>
            <Flex flexDir="column">
              <Box>
                <Flex flexDir="row">
                  <NavBar />
                </Flex>
              </Box>
              <Box>
                <Flex>
                  <PurchasedItems />
                </Flex>
              </Box>
              <EmailAlert />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
