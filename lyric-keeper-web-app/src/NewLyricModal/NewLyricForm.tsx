import React from "react";
import Button from "@material-ui/core/Button";
import {
  TextFieldStyles,
  StyledTextField,
  SwitchHelpText,
  StyledSwitch,
  SwitchLabel,
} from "./elements";
import { useFormik } from "formik";
import { Lyric } from "Types";
import Container from "@material-ui/core/Container";
import { UseDarkMode } from "Hooks";

interface Props {
  lyricData?: Lyric;
  onClickFunction(item: Partial<Lyric>): void;
}

export const NewLyricForm: React.FC<Props> = ({
  onClickFunction,
  lyricData,
}) => {
  const {
    handleChange,
    values: { title, chorus, verses, author, isPrivate },
  } = useFormik({
    initialValues: {
      title: lyricData?.title || "",
      author: lyricData?.author || "",
      isPrivate: lyricData?.isPrivate || false,
      chorus: lyricData?.chorus || "",
      verses: lyricData?.verses || "",
    },
    onSubmit: () => undefined,
  });

  const { darkModeIsEnabled } = UseDarkMode();

  const formFields = [
    {
      label: "Title",
      value: title,
      name: "title",
      width: "60%",
      helpText: "Title of song",
    },
    {
      label: "Artist",
      value: author,
      name: "author",
      width: "60%",
      helpText: "Artist of song",
    },
    {
      label: "Private",
      value: isPrivate,
      name: "isPrivate",
      helpText: isPrivate
        ? "This lyric is private and will not be seen in the lyric library"
        : "This lyric is public and will be seen by anyone in the lyric library",
      isSwitch: true,
    },
    {
      label: "Chorus",
      value: chorus,
      name: "chorus",
      multiline: true,
      rows: 4,
      helpText:
        "Chorus of the song. This will get placed in the body of the lyric anywhere you use the phrase: (chorus)",
    },
    {
      label: "Verses",
      value: verses,
      name: "verses",
      multiline: true,
      rows: 4,
      helpText:
        "Verses of song. Use (chorus) anywhere the above chorus is needed",
    },
  ];

  return (
    <Container maxWidth="sm">
      {formFields.map(
        ({
          label,
          value,
          multiline = false,
          rows = 1,
          helpText,
          name,
          width = "100%",
          isSwitch = false,
        }) => (
          <>
            {!isSwitch ? (
              <TextFieldStyles key={name}>
                <StyledTextField
                  darkMode={darkModeIsEnabled}
                  required
                  name={name}
                  multiline={multiline}
                  rowsMax={100}
                  rows={rows}
                  style={{ width }}
                  margin="dense"
                  label={label}
                  value={value}
                  onChange={handleChange}
                  placeholder={helpText}
                />
              </TextFieldStyles>
            ) : (
              <>
                <SwitchHelpText darkMode={darkModeIsEnabled}>
                  {helpText}
                </SwitchHelpText>
                <StyledSwitch
                  checked={isPrivate}
                  onChange={handleChange}
                  name={name}
                  value={true}
                />
                <SwitchLabel darkMode={darkModeIsEnabled}>Private</SwitchLabel>
              </>
            )}
          </>
        )
      )}
      <Button
        style={{ margin: "20px" }}
        variant="contained"
        onClick={() => {
          onClickFunction({ title, chorus, verses, author, isPrivate });
        }}
      >
        Save
      </Button>
    </Container>
  );
};
