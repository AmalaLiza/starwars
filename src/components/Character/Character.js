import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  width: 100%;
  background-color: antiquewhite;
  margin: 32px;
  padding: 10px;
`;

const PropertyWrapper = styled.div`
  padding: 10px;
`;

const Property = styled.span`
  font-weight: bold;
  text-transform: capitalize;
`;

const Value = styled.span`
  text-transform: capitalize;
`;

function Character() {
  const characterProperties = [
    "name",
    "height",
    "mass",
    "eye_color",
    "skin_color",
    "hair_color",
    "birth_year",
    "gender",
  ];
  const character = useSelector((state) => state.character);

  if (!character.name) {
    return null;
  }

  return (
    <Wrapper>
      {characterProperties.map((key) => (
        <PropertyWrapper key={key}>
          <Property>{key.split("_").join(" ")} : </Property>
          <Value>{character[key]}</Value>
        </PropertyWrapper>
      ))}
    </Wrapper>
  );
}

export default Character;
