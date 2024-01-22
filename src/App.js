import React from "react";
import styled from "styled-components";
import Logo from "./logo.png";
import Search from "./components/Search/Search.js";
import Character from "./components/Character/Character.js";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px;
`;

const Image = styled.img`
  width: 500px;
  height: 300px;
`;

export default function App() {
  return (
    <Wrapper>
      <Image src={Logo} alt="Starwars logo" />
      <Search />
      <Character />
    </Wrapper>
  );
}
