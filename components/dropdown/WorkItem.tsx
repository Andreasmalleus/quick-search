import { useEffect, useState } from "react";
import styled from "styled-components";

interface WorkItemProps {
  id: number;
  author: string;
  imgSrc: string;
  title: string;
  index: number;
  length: number;
}

export const WorkItem = ({
  id,
  author,
  imgSrc,
  title,
  index,
  length,
}: WorkItemProps): JSX.Element => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setIsImageLoaded(true);
    image.src = `${process.env.NEXT_PUBLIC_API_URL}/resources/titles/${imgSrc}`;

    return () => {
      image.onload = null;
    };
  }, []);

  return (
    <Item
      href={`https://www.amazon.com/search/s?k=${title} ${author}`}
      target={"_blank"}
    >
      <Container>
        {isImageLoaded ? (
          <StyledImage
            src={`${process.env.NEXT_PUBLIC_API_URL}/resources/titles/${imgSrc}`}
            loading={"lazy"}
            alt={"image of the book cover"}
          />
        ) : (
          <PlaceholderImage
            src={"/images/placeholder.jpeg"}
            alt={"placeholder image with no significance"}
          />
        )}
        <Content>
          <Author>{author}</Author>
          <Title>{title}</Title>
        </Content>
      </Container>
      {length - 1 == index ? null : <Divider />}
    </Item>
  );
};
const StyledImage = styled.img`
  width: 40px;
  height: 50px;
  margin-right: 8px;
  border-radius: 5%;
`;

const PlaceholderImage = styled(StyledImage)`
  opacity: 0.2;
`;

const Item = styled.a`
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 5px;
  &:hover {
    background-color: rgb(246, 249, 253);
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Divider = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 0.5px;
  background-color: grey;
`;

const Author = styled.h1`
  color: black;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Title = styled.h2`
  color: grey;
  font-size: 12px;
  font-weight: normal;
  padding: 0px;
  margin: 0px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;
