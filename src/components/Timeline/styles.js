import styled from "styled-components";

export const StyledTimeline = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  overflow: hidden;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    aspect-ratio: 16/9;
    font-weight: 500;
    object-fit: cover;
    width: 100%;
    max-width: 300px;
    height: auto;
  }
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 16px;
    .carrousel {
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-row: 2;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px,1fr);
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      ::-webkit-scrollbar{
        height: 8px;
        width: 4px;
        background: transparent;
      };
      ::-webkit-scrollbar-thumb:horizontal{
          background: gray;

      };
      a {
        scroll-snap-align: start;
        span {
          padding-top: 8px;
          display: block;
          padding-right: 24px;
          margin-bottom: 8px;
          color: ${({ theme }) => theme.textColorBase || "#222222"};
        }
        .thumbnail {
          position: relative;
          svg {
            position: absolute;
            top: 2%;
            right: 3%;
            border: 0;
            background-color: transparent;
          }
        }
      }
    }
  }
`;