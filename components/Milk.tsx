import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useSpring, animated as a, config } from "react-spring";

interface props {
  onRest: () => void;
  image: 1 | 2 | 3;
}

function calcRandomStart() {
  const rnd = Math.random();
  const rndEnd = Math.random();

  if (rnd <= 0.25) return 1;
  if (rnd <= 0.5) return 2;
  if (rnd <= 0.75) return 3;
}

function genPosFromStart(startSide: number): [number, number] {
  if (startSide === 1) return [0 - 50, 50];
  if (startSide === 2) return [50, 100 + 50];
  if (startSide === 3) return [100 + 50, 50];
  if (startSide === 4) return [50, 0 - 50];
  return [0, 0];
}

const Milk: React.FC<props> = ({ onRest, image }) => {
  const [startSide] = useState(calcRandomStart());
  const [start] = useState<[number, number]>(genPosFromStart(startSide));
  const [end] = useState<[number, number]>([100, 50]);

  const pos = useSpring({
    from: {
      top: `${start[0]}vh`,
      left: `${start[1]}vw`,
      transform: `scale(.5) rotate(0deg)`,
    },
    to: {
      top: `${end[0]}vh`,
      left: `${end[1]}vw`,
      transform: `scale(.5) rotate(300deg)`,
    },
    config: {
      mass: 10,
      friction: 0,
      tension: 1,
      velocity: 0.1,
      clamp: true,
    },
    onRest,
  });

  if (image === 1)
    return <Container src={"./soy1.png"} style={pos}></Container>;
  if (image === 2)
    return <Container src={"./soy2.png"} style={pos}></Container>;
  return <Container src={"./soy3.png"} style={pos}></Container>;
};

export default Milk;

const Container = styled(a.img)`
  position: absolute;
  display: block;
`;
