import styled from "styled-components";
import Image from "next/image";
import { useAppSelector } from "../../pages/store/hooks";
import { searchInputSelector } from "../../pages/store/slices/searchInputSlice";

export const Error = (): JSX.Element => {
  const { searchTerm } = useAppSelector(searchInputSelector);

  return (
    <Container>
      <Image src={"/icons/search.svg"} width={50} height={50} />
      <Title>No results found for: {searchTerm}</Title>
      <Subtitle>
        We couldn&apos;t find anything matching your search. Try again with a
        different term.
      </Subtitle>
    </Container>
  );
};

const Title = styled.div`
  margin-top: 5px;
  padding: 5px;
  color: black;
`;

const Subtitle = styled.div`
  padding: 5px;
  font-size: 12px;
  color: grey;
  line-height: 2;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
