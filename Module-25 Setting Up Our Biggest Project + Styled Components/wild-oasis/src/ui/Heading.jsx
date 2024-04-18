import styled, { css } from "styled-components";

// const Heading = styled.h1`
//   ${(props) => {
//     return props.type === "h1" &&
//       css`
//         font-size: 30px;
//         font-weight: 600;
//       `
//   }}
//   ${(props) => {
//     return props.type === "h2" &&
//       css`
//         font-size: 20px;
//         font-weight: 500;
//       `
//   }}
//   ${(props) => {
//     return props.type === "h3" &&
//       css`
//         font-size: 10px;
//         font-weight: 400;
//       `
//   }}
// `;

const Heading = styled.h1`
  ${(props) => {
    return (
      props.as === "h1" &&
      css`
        font-size: 30px;
        font-weight: 600;
      `
    );
  }}
  ${(props) => {
    return (
      props.as === "h2" &&
      css`
        font-size: 20px;
        font-weight: 500;
      `
    );
  }}
  ${(props) => {
    return (
      props.as === "h3" &&
      css`
        font-size: 10px;
        font-weight: 400;
      `
    );
  }}
`;
export default Heading;

// The problem with using type is that it will not be sementically correct h2 element jaisa to hai par wo css property change karke banega to markup mai <h1> </h1> ye hi likha aayga
// to avoid this we use a special prop name as `as` . In it ap jo sentactical element likhoge wo hi banega
