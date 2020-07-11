import React, { useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { StyledImg } from "./elements";

interface Props {
  src: string;
  height?: string;
  width?: string;
  alt?: string;
}

export const Image: React.FC<Props> = ({ ...props }) => {
  const [imageHasLoaded, setImageHasLoaded] = useState(false);
  return (
    <>
      {!imageHasLoaded && (
        <Skeleton
          style={{
            textAlign: "inherit",
            margin: "inherit",
            borderRadius: "8px",
          }}
          variant="rect"
          width={props.width || 130}
          height={props.height || 118}
        />
      )}
      <StyledImg
        style={{ borderRadius: "8px" }}
        isHidden={imageHasLoaded}
        onLoad={() => setImageHasLoaded(true)}
        {...props}
        alt={props.alt || "Alt text"}
      />
    </>
  );
};
