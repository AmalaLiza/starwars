import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from './logo.png';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 584px;
`;

const Image = styled.img`
    width: 500px;
    height: 300px;
`;

const Input = styled.input`
    width: 100%;
    border-radius: 24px;
    padding: 10px;
`;

const ListItem = styled.div`
    width: 100%;
    background-color: white;
    text-align: left;
    padding: 10px;
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 24px;
`;

const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 24px;
`;

function Details({ details = {} }) {
  return (
    <DetailsWrapper>
      {Object.keys(details).map((key) => (
         details[key] ? <ListItem key={key}>{key} -  {details[key]} </ListItem>: null
      ))}
    </DetailsWrapper>
  );
}

const List = ({ items = [], onItemClick }) => items?.map((item) => (
  <ListItem key={item.name} onClick={() => onItemClick(item)}>{item.name}</ListItem>
));

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [details, setShowDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://swapi.dev/api/people/?search=${searchText}`);
      const parsedResponse = await response.json();
      if (!ignore) {
        setData(parsedResponse.results);
      }
    };
    let ignore = false;

    fetchData();

    return () => {
      ignore = true;
    };
  }, [searchText]);

  const onChangeSearch = (value) => {
    setSearchText(value);
  };

  return (
    <Wrapper>
      <Image src={Logo} alt="Search" />
      <InputWrapper>
        <Input type="text" id="input_search" onChange={(e) => onChangeSearch(e.target.value)} />
      </InputWrapper>
      {searchText.length > 0 && (
        <ListWrapper>
          <List
            items={data}
            onItemClick={(character) => {
              setSearchText('');
              setShowDetails(character);
            }}
          />
        </ListWrapper>
        )}
        {details
          && <Details details={details} />}

    </Wrapper>
  );
}
