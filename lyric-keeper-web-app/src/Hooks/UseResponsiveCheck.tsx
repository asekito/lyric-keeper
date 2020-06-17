import { useState, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const UseResponsiveCheck = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const mobileSize = !useMediaQuery("(min-width:500px)");
  const tabletSize = !useMediaQuery("(min-width:800px)");

  useEffect(() => {
    setIsMobile(mobileSize);
    setIsTablet(tabletSize);
  }, [mobileSize, tabletSize]);

  return { isMobile, isTablet };
};
