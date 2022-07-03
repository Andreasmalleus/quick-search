import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

interface LoadingProps {
  loading: boolean;
}

export const Loading = ({ loading = false }: LoadingProps): JSX.Element => {
  return (
    <Container>
      <ClipLoader loading={loading} color={"rgb(0, 150, 255)"} />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
