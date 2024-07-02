import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 60px;
  text-align: center;
  white-space: nowrap;
  padding: ${(props) => props.padding || "20px 60px"};
  border: ${(props) => props.border === "standard" ? "1px soild black" : "none"};
  width: ${(props) => props.width || '212px'};
  height: ${(props) => props.height || '69px'};
  background-color: ${(props) => props.bg || '#C4C8D6'};
  border-radius: ${(props) => props.radius || '12px'};
  color: ${(props) => props.color || "#7A7A7A"};
  margin: ${(props) => props.margin || "0px"};
  box-shadow: ${(props) => props.shadow === "on" ? "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" : ""};
`

export default Button;


