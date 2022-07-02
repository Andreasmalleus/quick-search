import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../pages/store/hooks";
import { searchInputSelector } from "../../pages/store/slices/searchInputSlice";
import {
  fetchWorksBySearchTerm,
  worksSelector,
} from "../../pages/store/slices/worksSlice";
import { Titles, Work } from "../../types";

interface DefaultProps {
  works: Array<Work>;
}

export const WorkList = ({ works }: DefaultProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector(searchInputSelector);
  const { hasMore } = useAppSelector(worksSelector);

  const getImageSource = (titles: Titles) => {
    if (Array.isArray(titles.isbn)) {
      return titles.isbn[0].$;
    }
    return titles.isbn.$;
  };

  //handles loading more works
  const loadMoreWorks = () => {
    dispatch(
      fetchWorksBySearchTerm({
        searchTerm,
        cursor: works.length,
      })
    );
  };

  return (
    <ScrollBarWrapper>
      {works.map((work: Work, index: number) => {
        const { workid, authorweb, titleweb, titles } = work;
        const imgSrc = getImageSource(titles);
        return (
          <WorkItem
            href={`https://www.amazon.com/search/s?k=${titleweb} ${authorweb}`}
            target={"_blank"}
            key={workid}
          >
            <Container>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/resources/titles/${imgSrc}`}
              />
              <Content>
                <Author>{authorweb}</Author>
                <Title>{titleweb}</Title>
              </Content>
            </Container>
            {works.length - 1 == index ? null : <Divider />}
          </WorkItem>
        );
      })}
      {hasMore ? (
        <LoadMoreButton onClick={() => loadMoreWorks()}>
          Load more
        </LoadMoreButton>
      ) : null}
    </ScrollBarWrapper>
  );
};

const LoadMoreButton = styled.div`
  padding-left: 5px;
  margin-top: 4px;
  cursor: pointer;
  font-size: 12px;
  color: rgb(0, 150, 255);
  transform: 300ms;
  width: fit-content;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ScrollBarWrapper = styled.div`
  overflow-y: auto;
  height: fit-content;
  max-height: 260px;

  &::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
  }
  ::-scrollbar-track {
    background-color: #fff;
  }

  ::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 5px solid #fff;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid #f4f4f4;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }
`;

const WorkItem = styled.a`
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

const Image = styled.img`
  width: 40px;
  height: 50px;
  margin-right: 8px;
  border-radius: 5%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
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
`;
