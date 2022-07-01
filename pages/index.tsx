import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quick Search implementation</title>
      </Head>
      <Main>Main</Main>
    </>
  );
};

export default Home;

const Main = styled.main`
  background-image: linear-gradient(rgb(246, 249, 253), white);
  width: 100%;
  height: 100%;
`;
