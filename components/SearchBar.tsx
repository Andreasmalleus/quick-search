import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../pages/store/hooks";
import {
  closeDropdown,
  showDropdown,
} from "../pages/store/slices/dropdownSlice";
import {
  clearWorks,
  fetchWorksBySearchTerm,
  setLoading,
} from "../pages/store/slices/worksSlice";
import Image from "next/image";
import {
  searchInputSelector,
  setSearchTerm,
} from "../pages/store/slices/searchInputSlice";

export const SearchBar = (): JSX.Element => {
  const { searchTerm } = useAppSelector(searchInputSelector);
  const [focused, setFocused] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //setting delay
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm != "") {
        dispatch(fetchWorksBySearchTerm({ searchTerm }));
      }
    }, 1000);
    //cleanup function
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  //handles the closing of dropdown
  const handleClose = () => {
    dispatch(closeDropdown());
    dispatch(clearWorks());
    dispatch(setSearchTerm(""));
  };

  //handles input change
  const handleChange = (input: ChangeEvent<HTMLInputElement>) => {
    const value = input.target.value;
    //when input is empty close the dropdown
    if (value == "") {
      handleClose();
      return;
    }
    dispatch(setSearchTerm(value));
    dispatch(setLoading());
    dispatch(showDropdown());
  };

  return (
    <Container
      style={{
        border: focused
          ? "2px solid rgb(0, 150, 255)"
          : "2px solid transparent",
      }}
    >
      <Image src={"/icons/search.svg"} width={15} height={15} />
      <Input
        type="text"
        value={searchTerm}
        placeholder="search"
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        autoFocus
        onBlur={() => setFocused(false)}
      />
      <StyledImage
        isVisible={searchTerm != ""}
        src={"/icons/close.svg"}
        width={15}
        height={15}
        onClick={handleClose}
      />
    </Container>
  );
};

interface StyledImageProps {
  isVisible: boolean;
}

const StyledImage = styled(Image)<StyledImageProps>`
  cursor: pointer;
  transition: opacity 0.5s linear;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
`;

const Container = styled.div`
  background-color: rgb(236, 239, 243);
  border-radius: 5px;
  font-family: "Graphik";
  min-width: 100px;
  width: 100%;
  max-width: 200px;
  display: flex;
  padding-right: 4px;
  padding-left: 4px;
  transition: border-color 0.5s ease;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color: rgb(236, 239, 243);
  outline: none;
  padding: 4px;
`;
