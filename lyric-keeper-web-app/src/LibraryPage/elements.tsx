import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

export const MainAreaWrapper = styled(Container)`
  margin: auto;
  padding-bottom: 70px;
`;

export const StyledSelect = styled(Select)<{ darkMode: boolean }>`
  width: 4.5rem;
  display: inline-block;
  margin-top: 16px;
  left: 13px;
  color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
  & {
    .MuiSelect-icon {
      color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
    }
  }
`;

export const StyledTextField = styled(TextField)<{ darkMode: boolean }>`
  & {
    .MuiInputBase-input {
      color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
    }
    .MuiInputLabel-root {
      color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
    }
  }
`;

export const StyledIconButton = styled(IconButton)<{ darkMode: boolean }>`
  color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
`;

export const NoLyricsToDisplayText = styled.div<{ darkMode: boolean }>`
  margin-top: 5vh;
  font-size: 3vh;
  display: block;
  letter-spacing: 0.2vw;
  color: ${({ darkMode }) => (darkMode ? "white" : "black")};
`;
