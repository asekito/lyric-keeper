import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Home from "@material-ui/icons/Home";
import Edit from "@material-ui/icons/Edit";
import Cancel from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "GlobalComponents";
import { SecondaryLightGrey } from "ColorVars";
import { UseResponsiveCheck } from "Hooks";

export const SnackbarButtons: React.FC<any> = ({ edit, setEdit }) => {
  const { isTablet } = UseResponsiveCheck();

  const buttons = [
    {
      name: "Home",
      icon: () => <Home />,
      link: "/",
    },
    {
      name: "EDIT",
      icon: () => <Edit />,
      onClick: () => setEdit(true),
    },
    {
      name: "CANCEL",
      icon: () => <Cancel />,
      display: !!edit ? "flex" : "none",
      onClick: () => setEdit(false),
    },
  ];

  return (
    <Grid container>
      {buttons.map(
        ({ name, icon, onClick = () => null, display = "flex", ...rest }) => {
          const InnerWrapper: React.FC<{ to?: string }> = ({
            children,
            to = "",
          }) => (
            <>{rest.link ? <Link to={to}>{children}</Link> : <>{children}</>}</>
          );

          const ButtonElement: React.FC<{
            style: React.CSSProperties;
            onClick(): void;
          }> = ({ children, style }: any) =>
            isTablet ? (
              <IconButton
                edge="end"
                style={{
                  ...style,
                  backgroundColor: SecondaryLightGrey,
                }}
              >
                {children}
              </IconButton>
            ) : (
              <Button style={{ ...style }} size="large" variant="contained">
                {children}
              </Button>
            );

          return (
            <Grid item xs={12} key={name} onClick={onClick}>
              <InnerWrapper to={rest.link && rest.link}>
                <ButtonElement
                  onClick={onClick}
                  style={{ display, marginTop: "15px" }}
                >
                  {icon()}
                  {!isTablet && name}
                </ButtonElement>
              </InnerWrapper>
            </Grid>
          );
        }
      )}
    </Grid>
  );
};
