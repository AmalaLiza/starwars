import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCharacter } from "../Character/characterReducer";
import SearchIcon from "./magnifier.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 584px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 30px;
  padding: 15px 0 15px 15px;
  font-size: 20px;
  box-sizing: border-box;
`;

const Image = styled.img`
  width: 40px;
  position: absolute;
  height: 40px;
  top: 9px;
  right: 15px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListItem = styled.div`
  width: 100%;
  background-color: white;
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid lightgrey;
  box-sizing: border-box;
`;

const Message = styled.span`
  border-radius: 5px;
  margin: 32px;
  padding: 10px;
  color: ${({ type }) => (type === "error" ? "#e80f0f" : "#ffe820")};
  text-align: center;
`;

const List = ({ items = [], onItemClick }) =>
  items.length > 0 ? (
    items?.map((item) => (
      <ListItem key={item.name} onClick={() => onItemClick(item)}>
        {item.name}
      </ListItem>
    ))
  ) : (
    <Message type="error">No results found</Message>
  );

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const character = useSelector((state) => state.character);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(`https://swapi.dev/api/people/?search=${searchText}`);
      const parsedResponse = await response.json();
      if (!ignore) {
        setSearchResults(parsedResponse.results);
        setIsLoading(false);
      }
    };

    let ignore = false;
    if (searchText && searchText.length >= 2) {
      setIsLoading(true);
      fetchCharacters();
    }

    return () => {
      ignore = true;
    };
  }, [searchText]);

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Search a character"
          onChange={(e) => {
            if (character.name) dispatch(setActiveCharacter({}));
            setSearchText(e.target.value);
          }}
        />
        <Image src={SearchIcon} alt="Search icon" />
      </InputWrapper>
      {isLoading ? (
        <Message type="warning">Loading...</Message>
      ) : (
        searchText.length >= 2 && (
          <ListWrapper>
            <List
              items={searchResults}
              onItemClick={(character) => {
                setSearchText("");
                dispatch(setActiveCharacter(character));
              }}
            />
          </ListWrapper>
        )
      )}
    </Wrapper>
  );
};

export default Search;
