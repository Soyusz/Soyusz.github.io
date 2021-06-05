import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import Milk from "../components/Milk";

interface milkProp {
  id: number;
  image: 1 | 2 | 3;
}

export default function Home() {
  const [milks, setMilks] = useState<milkProp[]>([
    { id: 1, image: 1 },
    { id: 2, image: 2 },
  ]);

  const removeChild = useCallback((index: number) => {
    setMilks((o) => o.filter((el, elI) => elI !== index));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-ignore
      let randomImage: 1 | 2 | 3 = 1 + Math.floor(Math.random() / 0.3333);
      console.log(randomImage);
      setMilks((o) => [...o, { id: Math.random(), image: randomImage }]);
    }, 2 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <Main>
        <Left>soy</Left>
        <Right>usz</Right>
      </Main>
      <MilkContainer>
        {milks.map((milk, milkIndex) => (
          <Milk key={milk.id} image={milk.image} onRest={() => {}} />
        ))}
      </MilkContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url("./background.png");
  position: relative;
  overflow: hidden;
`;

const MilkContainer = styled.div``;

const Main = styled.main`
  display: flex;
  flex: 1;

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
  }
`;

const Left = styled.div`
  background-color: rgba(255, 255, 255, 0.952);
  color: black;
  flex: 1;
  justify-content: flex-end;
`;

const Right = styled.div`
  background-color: rgba(0, 0, 0, 0.801);
  color: white;
  flex: 1;
  justify-content: flex-start;
`;
