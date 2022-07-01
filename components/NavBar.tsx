import styled from "styled-components";

export const NavBar = (): JSX.Element => {
  return (
    <Nav>
      <Title>Quick Search</Title>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: rgb(255, 255, 255);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid grey;
`;

//add h1
const Title = styled.h1`
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 0px;
  margin: 0px;
`;
