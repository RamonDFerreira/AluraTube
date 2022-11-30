import styled from "styled-components";

export const StyledLogin = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  & div {
    max-width: 400px;
    border: 1px solid white;
    background: ${({ theme }) => theme.backgroundLevel1 };
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 2em;
    border-radius: 8px;
    box-shadow: 0 0 1000px 50px #d3eaf2;
    & h1 {
      text-align: left;
    }
    & p{
      margin-top: 1em;
    }
    & button {
      margin: 3em 0;
      padding: 1em 2em;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      & svg {
        margin-right: 1em;
      }
    }
  }
`;