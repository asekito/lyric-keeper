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
          variant="rect"
          width={props.width || 130}
          height={props.height || 118}
        />
      )}
      <StyledImg
        isHidden={imageHasLoaded}
        onLoad={() => setImageHasLoaded(true)}
        {...props}
        alt={props.alt || "Alt text"}
      />
    </>
  );
};
