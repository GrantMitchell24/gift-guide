//import Box from Chakra
import { Box, Flex, Text, Center } from "@chakra-ui/react";

export default function Footer(props) {

  // Bring in color pallet
  const colorPallet = props.colorPallet

  return (
    <Center minH="100px" p="10px" backgroundColor={colorPallet.c1}>
      <Box color={colorPallet.c4}>
        <Flex flexDirection="row" gap="10">
          <Flex flexDirection="column">
            <a href="https://github.com/Wald14/" target="_blank">
              <Center>
              <img width="25px" className="footer-icon" src="/assets/icons/github-mark-white.png" />
              </Center>
              <p>Luke Wald</p>
            </a>
          </Flex>

          <Flex flexDirection="column">
            <a href="https://github.com/lavollmer" target="_blank">
              <Center>
              <img width="25px" className="footer-icon" src="/assets/icons/github-mark-white.png" />
              </Center>
              <p>Laura Vollmer</p>
            </a>
          </Flex>

          <Flex flexDirection="column">
            <a href="https://github.com/GrantMitchell24/" target="_blank">
              <Center>
              <img width="25px" className="footer-icon" src="/assets/icons/github-mark-white.png" />
              </Center>
              <p>Grant Mitchell</p>
            </a>
          </Flex>

          <Flex flexDirection="column">
            <a href="https://github.com/Tkilla14" target="_blank">
              <Center>
              <img width="25px" className="footer-icon" src="/assets/icons/github-mark-white.png" />
              </Center>
              <p>Tucker Killian</p>
            </a>
          </Flex>
        </Flex>
        <Center pt="8px">
          <Text fontSize="10px">&copy; Copyright 2023. All rights reserved.</Text>
        </Center>
      </Box>
    </Center>
  );
}
