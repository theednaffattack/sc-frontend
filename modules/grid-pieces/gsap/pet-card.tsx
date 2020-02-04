import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import { DogButton } from "./pet-grid";
import { TweenMax, TimelineMax, Elastic, Back } from "gsap";

const Card = styled.div`
  position: relative;
  transition: transform 0.2s ease-in;
  background: #99f3eb;
  color: black;
  width: 200px;
  max-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 5px 20px;
  cursor: pointer;
  box-shadow: 0px 1px 6px -2px grey;
  overflow: hidden;
`;
const MainTitle = styled.h2`
  font-size: 20px;
  color: white;
  background: black;
  padding: 10px;
  text-transform: capitalize;
`;
const RevealH3 = styled.h3`
  font-size: 25px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px;
  text-transform: capitalize;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 30%;
  transform: translateY(20px);
`;
const DogImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: scale;
  flex-shrink: 2;
  filter: grayscale(1) blur(1px);
  transform-origin: center center;
  transform: scale(0.8);
`;

interface PetCardProps {
  id: string;
  imgUrl: string;
  breed: string;
}
const PetCard: React.FC<PetCardProps> = props => {
  let imgRef = useRef(null);
  let textRef = useRef(null);
  let cardRef = useRef(null);
  // let buttonRef = useRef(null);
  const [mouseAnimation, setMouseAnimation] = useState();
  const [clickAnimation, setClickAnimation] = useState();
  const [tl] = useState(new TimelineMax({ paused: true }));
  useEffect(() => {
    setMouseAnimation(
      TweenMax.to(imgRef, 1, {
        scale: 1,
        filter: "none",
        ease: Elastic.easeOut.config(1, 0.75)
      }).pause()
    );
  }, []);
  useEffect(() => {
    setClickAnimation(tl.add("s"));

    setClickAnimation(
      tl
        .to(
          textRef,
          1,
          {
            autoAlpha: 1,
            y: 0,
            ease: Elastic.easeIn.config(1, 0.75)
          },
          "s"
        )
        .to(
          cardRef,
          0.4,
          {
            transformOrigin: "center center",
            ease: Back.easeIn.config(1.4),
            scale: 0.1
          },
          "s+=1.5"
        )
        .to(
          cardRef,
          0.4,
          {
            opacity: 0,
            display: "none"
          },
          "s+=2"
        )
    );
  }, [tl]);

  return (
    <Card
      onMouseEnter={() => mouseAnimation.play()}
      className="dog-card "
      key={props.id}
      ref={cardRef}
    >
      <DogImage
        ref={imgRef}
        className="dog-image"
        alt="random dog"
        src={props.imgUrl}
      />
      <RevealH3 ref={textRef} className="reveal">
        Thank you!{" "}
        <span role="img" aria-label="triple pink heart">
          💗
        </span>
      </RevealH3>
      <DogButton onClick={() => clickAnimation.play()}>AdoptMe</DogButton>
      <MainTitle>{props.breed}</MainTitle>
    </Card>
  );
};
export default PetCard;
