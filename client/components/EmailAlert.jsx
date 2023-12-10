import { Switch } from "@chakra-ui/react";
//import Box from Chakra
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";

export default function EmailAlert() {
  return (
    <Box>
      <Flex>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            Enable email alerts?
          </FormLabel>
          <Switch id="email-alerts" />
        </FormControl>
      </Flex>
    </Box>
  );
}
