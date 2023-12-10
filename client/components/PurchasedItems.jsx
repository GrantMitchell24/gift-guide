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

export default function PurchasedItems() {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Gift Guide - Purchased</TableCaption>
        <Thead>
          <Tr>
            <Th>Person</Th>
            <Th>Group</Th>
            <Th isNumeric>Item</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Jane Doe</Td>
            <Td>Nonproft</Td>
            <Td isNumeric>Scarf</Td>
          </Tr>
          {/* <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr> */}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
