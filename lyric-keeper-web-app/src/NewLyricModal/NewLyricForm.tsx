import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { TextFieldStyles } from "./elements";
import { useFormik } from "formik";
import { Lyric } from "Types";
import Container from "@material-ui/core/Container";

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
    values: { title, chorus, verses, author },
  } = useFormik({
    initialValues: {
      title: (lyricData && lyricData.title) || "",
      chorus: (lyricData && lyricData.chorus) || "",
      verses: (lyricData && lyricData.verses) || "",
      author: (lyricData && lyricData.author) || "",
    },
    onSubmit: () => undefined,
  });

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
        }) => (
          <>
            <TextFieldStyles>
              <TextField
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
          </>
        )
      )}
      <Button
        style={{ margin: "20px" }}
        variant="contained"
        onClick={() => {
          onClickFunction({ title, chorus, verses, author });
        }}
      >
        Save
      </Button>
    </Container>
  );
};
