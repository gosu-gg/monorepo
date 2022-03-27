import { forwardRef } from "react";
import styled from "styled-components";
import InputUnstyled, { InputUnstyledProps } from "@mui/base/InputUnstyled";

const StyledInputElement = styled.input`
  width: 10rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 400;
  color: white;
  background: transparent;
  border: none;
  border-radius: 5px;
  transition: outline 100ms;
  padding: 0.3rem;

  &&:focus {
    outline: none;
  }
`;

const Input = forwardRef(function CustomInput(
  props: InputUnstyledProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
    />
  );
});

export default Input;
