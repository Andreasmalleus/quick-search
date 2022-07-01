import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { NavBar } from "../components/NavBar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quick Search implementation</title>
      </Head>
      <Main>
        <NavBar />
      </Main>
    </>
  );
};

export default Home;

const Main = styled.main`
  background-image: linear-gradient(rgb(246, 249, 253), white);
  width: 100%;
  height: 100%;
`;
