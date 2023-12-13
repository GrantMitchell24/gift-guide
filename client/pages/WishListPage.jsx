import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppProvider";

//import Box from Chakra
import { Box, Flex, Heading, Text, Center } from "@chakra-ui/react";
import { UserTable } from "../components";

import { AddItem } from "../components";

export default function WishListPage(props) {

  // Bring color pallet in from props
  const colorPallet = props.colorPallet

  // Controls Add Items Button Display
  // userId: 
  const params = useParams();

  // Bring in logged in user info
  const { user } = useAppCtx()


  if (!user) return <></>
  return (
    <>
      <Box
        bgImage="url(/assets/images/joanna-kosinska-0CQfTLOVTPU-unsplash.jpg)"
        bgSize="cover"
        bgRepeat="no-repeat"
        minH="80vh"
      >
        <Center>
          <Box p="20px">
            <Flex scrollBehavior="smooth">
              <Heading color={colorPallet.c1} pb="20px">Wish List</Heading>
            </Flex>
            <Flex flexDir="row">
              {user._id === params.userId && (
                <AddItem colorPallet={colorPallet} />
              )
              }

            </Flex>

            <UserTable colorPallet={colorPallet} />

          </Box>
        </Center>
      </Box>
    </>
  );
}
