import React, { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppProvider";
import "../assets/css/SearchBar.css";
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'
// import searchIcon from "../assets/icons/search.png";
// import cancelIcon from "../assets/icons/cancel.png";




// const { user } = useAppCtx()
// console.log(user)

export default function SearchBar({ placeholder, data }) {
  
  //-----------------------------------------------
  // Bring in logged in user info
  const { user } = useAppCtx()

  const [allUserData, setAllUserData] = useState("");


  // Fetch most recent user info
  async function getUserInfo() {
      const query = await fetch(`/api/user/`)
      const result = await query.json()
      const allUsers = result.payload
      console.log(allUsers)
      setAllUserData(allUsers)
  }

  useEffect(() => {
    getUserInfo()
  }, [user])


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
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="cancelBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              //<a className="dataItem" href={value.link} target="_blank">
                <p key={value._id}>{value.username} </p>
              //</a>
            );
          })}
        </div>
      )}
    </div>
  );
}