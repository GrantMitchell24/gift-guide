import { useState } from React

export default function UserTable(){

  const { user } = useAppCtx()
  console.log(user)

const userData = useState([])

return(
<div className="UserTable">
  <TableContainer>
    <Table variant=
    "stripped">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Wish Rank</Th>
          <Th>Cost</Th>
          <Th>Notes</Th>
          <Th>Purchased</Th>
          <Th>Link</Th>
        </Tr>
      </Thead>
      <Tbody>
        {userData?.map((userData) => (
          <Tr>
            <Td>{userData.name}</Td>
            <Td>{userData.wishRank}</Td>
            <Td>{userData.cost}</Td>
            <Td>{userData.notes}</Td>
            <Td>{userData.purchased}</Td>
            <Td>{userData.link}</Td>
          </Tr>
        ))}

      </Tbody>
    </Table>
  </TableContainer>
</div>
)}

