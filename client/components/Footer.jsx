//import Box from Chakra
import { Box, Flex, Text, Center } from "@chakra-ui/react";

export default function Footer(props) {

  // Bring in color pallet
  const colorPallet = props.colorPallet

  return (
    <Center minH="100px" p="10px" backgroundColor={colorPallet.c5}>
      <Box>
          <Flex>
          <a href="https://github.com/Wald14/" target="_blank">
              <img className="footer-icon" src="/assets/icons/github-mark-white.png" />
          </a>
          </Flex>
          <Text fontSize="10px">&copy; Copyright 2023. All rights reserved.</Text>
      </Box>
    </Center>
  );
}
