import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import PetCard from "./pet-card";

interface DogButtonProps {
  primary?: boolean;
}

// Define Styled Components outside of the render method
// It is important to define your styled components outside of the render method, otherwise it will be recreated on every single render pass. Defining a styled component within the render method will thwart caching and drastically slow down rendering speed, and should be avoided.
export const DogButton = styled.button<DogButtonProps>`
  width: 100px;
  height: 30px;
  background: ${props => (props.primary ? "#FFF" : "#2a2223")};
  color: ${props => (props.primary ? "#2a2223" : "#FFF")};
  border: 0;
  margin: 5px 10px;
  transition: 0.2s ease-in;
  border: ${props =>
    props.primary ? "2px solid #99f3eb" : "2px solid #2a2223"};
  &:hover {
    background: ${props => (props.primary ? "#2a2223" : "#fff")};
    color: ${props => (props.primary ? "#fff" : "#2a2223")};
    border: ${props =>
      props.primary ? "2px solid #2a2223" : "2px solid #99f3eb"};
  }
`;
export default function PetGrid() {
  // https://dog.ceo/api/breed/hound/images/random/15
  const [pets, setPets] = useState([]);
  const [breed, setBreed] = useState("pug");

  useEffect(() => {
    axios
      .get(`https://dog.ceo/api/breed/${breed}/images/random/6`)
      .then(response => {
        const doggos = response.data.message;
        console.log(doggos);
        setPets(doggos);
      })
      .catch(error => {
        console.log("Sorry no doggos", error);
      });
  }, [breed]);

  return (
    <div className="container">
      <DogButton onClick={() => setBreed("mastiff")}>Mastiff</DogButton>
      <DogButton primary onClick={() => setBreed("labrador")}>
        Labrador
      </DogButton>
      <div className="entry">
        {pets.map(item => {
          return <PetCard id={item} key={item} breed={breed} imgUrl={item} />;
        })}
      </div>
    </div>
  );
}
