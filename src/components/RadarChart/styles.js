import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 3.2rem 0;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 40rem;

  span {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  div {
    &.select-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      div {
        width: 200px;

        p {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;
