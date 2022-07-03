import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../pages/store/hooks";
import { searchInputSelector } from "../../pages/store/slices/searchInputSlice";
import {
  fetchWorksBySearchTerm,
  setIsAppending,
  worksSelector,
} from "../../pages/store/slices/worksSlice";
import { Titles, Work } from "../../types";
import { WorkItem } from "./WorkItem";

interface DefaultProps {
  works: Array<Work>;
}

export const WorkList = ({ works }: DefaultProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector(searchInputSelector);
  const { hasMore, isAppending } = useAppSelector(worksSelector);

  const getImageSource = (titles: Titles) => {
    if (Array.isArray(titles.isbn)) {
      return titles.isbn[0].$;
    }
    return titles.isbn.$;
  };

  //handles loading more works
  const loadMoreWorks = () => {
    dispatch(setIsAppending());
    dispatch(
      fetchWorksBySearchTerm({
        searchTerm,
        cursor: works.length,
      })
    );
  };

  console.log(isAppending);

  return (
    <ScrollBarWrapper>
      {works.map((work: Work, index: number) => {
        const { workid, authorweb, titleweb, titles } = work;
        const imgSrc = getImageSource(titles);
        return (
          <WorkItem
            key={workid}
            id={parseInt(workid)}
            author={authorweb}
            title={titleweb}
            imgSrc={imgSrc}
            length={works.length}
            index={index}
          />
        );
      })}

      {isAppending ? (
        <LoaderContainer>
          <ClipLoader size={20} />
        </LoaderContainer>
      ) : null}

      {hasMore && !isAppending ? (
        <LoadMoreButton onClick={() => loadMoreWorks()}>
          Load more
        </LoadMoreButton>
      ) : null}
    </ScrollBarWrapper>
  );
};

const LoaderContainer = styled.div`
  padding-left: 5px;
  height: 20px;
  text-align: center;
`;

const LoadMoreButton = styled.div`
  display: flex;
  align-items: end;
  height: 20px;
  padding-left: 5px;
  cursor: pointer;
  font-size: 12px;
  color: rgb(0, 150, 255);
  width: fit-content;
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

export const Divider = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 0.5px;
  background-color: grey;
`;
