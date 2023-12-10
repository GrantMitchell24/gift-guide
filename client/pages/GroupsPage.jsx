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
} from '@chakra-ui/react'



<TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>My Groups</TableCaption>
    <Thead>
      <Tr>
        <Th>Group Name</Th>
        <Th>Admin </Th>
        <Th> Group Members </Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Group B</Td>
        <Td></Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>Group C</Td>
        <Td></Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>Group D</Td>
        <Td></Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>Group E</Th>
        <Th></Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>