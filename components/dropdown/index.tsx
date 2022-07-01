import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../pages/store/hooks";
import {
  dropdownSelector,
  closeDropdown,
} from "../../pages/store/slices/dropdownSlice";
import { worksSelector } from "../../pages/store/slices/worksSlice";
import { WorkList } from "./WorkList";
import { Error } from "./Error";
import { Loading } from "./Loading";
import Image from "next/image";
import WithPortal from "../WithPortal";

export const DropDown = (): JSX.Element => {
  const { works, isLoading, hasErrors } = useAppSelector(worksSelector);
  const { isOpen } = useAppSelector(dropdownSelector);
  const dispatch = useAppDispatch();

  let content = null;

  if (works) {
    content = <WorkList works={works} />;
  }
  if (hasErrors) {
    content = <Error />;
  }
  if (isLoading) {
    content = <Loading loading={isLoading} />;
  }

  return (
    <WithPortal target="dropdown-root">
      <Container isOpen={isOpen}>
        {isLoading || hasErrors ? null : (
          <Menu>
            <Title>Found results:</Title>
            <StyledImage
              src={"/icons/close.svg"}
              width={20}
              height={20}
              onClick={() => dispatch(closeDropdown())}
            />
          </Menu>
        )}
        {content}
        <Pointer></Pointer>
      </Container>
    </WithPortal>
  );
};

const Pointer = styled.div`
  position: absolute;
  right: 30px;
  top: -10px;
  border-right: 15px solid transparent;
  border-left: 15px solid transparent;
  border-bottom: 15px solid white;
  border-radius: 25px;
`;

const StyledImage = styled(Image)`
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 12px;
  color: black;
  padding: 5px;
`;

const Menu = styled.div`
  background-color: white;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  position: sticky;
`;

interface ContainerProps {
  isOpen: boolean;
}

const Container = styled.div<ContainerProps>`
  transition: opacity 0.5s linear;
  position: absolute;
  top: 60px;
  right: 10px;
  display: inline-block;
  background-color: white;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  max-width: 400px;
  width: 100%;
  min-height: 330px;
  height: 330px;
  padding: 20px;
  z-index: 1;
  border-radius: 10px;
  font-size: 15px;

  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
`;
