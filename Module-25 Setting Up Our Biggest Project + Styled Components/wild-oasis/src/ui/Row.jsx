import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) => {
    return (
      props.type === "horizontal" &&
      css`
        justify-content: space-between;
        align-items: center;
      `
    );
  }}
  ${(props) => {
    return (
      props.type === "vertical" &&
      css`
        flex-direction: column;
        gap: 1.6rem;
      `
    );
  }}
`;

Row.defaultProps={
    type:"vertical"
}//styled components mai aise karna padega warna normal function mai to ham destructuring ke time hi kar skate hai ( for ex ->{ prop1="defaultval1"})
export default Row;
