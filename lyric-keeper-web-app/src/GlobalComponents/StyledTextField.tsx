import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

export const StyledTextField = styled(TextField)<{ darkMode: boolean }>`
  & {
    .MuiInputBase-input {
      color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
    }
    .MuiInputLabel-root {
      color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
    }
  }
`;
