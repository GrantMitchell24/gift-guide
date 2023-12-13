import React, { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppProvider";
// import "../assets/css/SearchBar.css";
import { CloseIcon } from "@chakra-ui/icons";
// import searchIcon from "../assets/icons/search.png";
// import cancelIcon from "../assets/icons/cancel.png";
import { IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text, Center } from "@chakra-ui/react";

// const { user } = useAppCtx()
// console.log(user)

import { Input } from "@chakra-ui/react";

// export default function SearchBar({ placeholder, data }) {
export default function SearchBar(props) {

  // Bring color pallet in from props
  const colorPallet = props.colorPallet

  //-----------------------------------------------
  // Bring in logged in user info
  const { user } = useAppCtx();

  const [allUserData, setAllUserData] = useState("");

  // Fetch most recent user info
  async function getUserInfo() {
    const query = await fetch(`/api/user/`);
    const result = await query.json();
    const allUsers = result.payload;
    console.log(allUsers);
    setAllUserData(allUsers);
  }

  useEffect(() => {
    getUserInfo();
  }, [user]);

  //----------------------------------------------

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allUserData.filter((user) => {
      return user.username.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <Box>
      <Box>
        <Box>
            <Flex className="searchInputs" pb="10px">
              <Input
                placeholder="Search for Wishlist"
                value={wordEntered}
                onChange={handleFilter}
                borderColor={colorPallet.c2}
                focusBorderColor={colorPallet.c3}
                _hover={{ borderColor: colorPallet.c3 }}
              />

              <Center className="searchIcon" pl="10px">
                {filteredData.length === 0 ? (
                  <SearchIcon width="20px" fontSize="1.3rem"/>
                ) : (
                  <CloseIcon id="cancelBtn" onClick={clearInput} />

                )}

              </Center>
            </Flex>
        </Box>
        {filteredData.length != 0 && (
          <Box className="dataResult" pb="10px">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a href={`/wishlist/${value._id}`} key={key}><Text fontSize="1.1rem" color={colorPallet.c5}  _hover={{ color: colorPallet.c2,
                }}>{value.username} </Text></a>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}
