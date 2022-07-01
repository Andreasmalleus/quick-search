import Head from "next/head";
import styled from "styled-components";
import { DropDown } from "./dropdown";
import { NavBar } from "./NavBar";

interface LayoutProps {
  title: string;
  children: JSX.Element;
}

export const Layout = ({ children, title }: LayoutProps): JSX.Element => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <DropDown />
      <div>{children}</div>
    </Container>
  );
};

const Container = styled.main`
  background-image: linear-gradient(rgb(246, 249, 253), white);
  width: 100%;
  height: 100%;
`;
