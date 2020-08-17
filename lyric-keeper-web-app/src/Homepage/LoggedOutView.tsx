import React from "react";
import { PageHeader, Link } from "GlobalComponents";
import {
  LoggedOutDescriptiveText,
  LoggedOutInfoSectionWrapper,
} from "./elements";
import Container from "@material-ui/core/Container";
import MoneyIcon from "@material-ui/icons/MonetizationOnOutlined";
import ListIcon from "@material-ui/icons/ListAltOutlined";
import { SecondaryColor, MainGreen } from "ColorVars";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import RightArrow from "@material-ui/icons/ArrowRight";

export const LoggedOutView: React.FC = () => (
  <Container maxWidth="md">
    <PageHeader>Welcome to Lyric Keeper!</PageHeader>
    <LoggedOutInfoSectionWrapper>
      <LoggedOutDescriptiveText>
        <Grid container>
          <Grid item xs={12} md={1}>
            <MoneyIcon
              style={{
                fontSize: "4rem",
                color: SecondaryColor,
              }}
            />
          </Grid>
          <Grid item xs={12} md={11}>
            Are you looking for a simple yet highly effective way to store all
            your lyrics for FREE?
          </Grid>
        </Grid>
      </LoggedOutDescriptiveText>
      <LoggedOutDescriptiveText>
        <Grid container>
          <Grid item xs={12} md={1}>
            <ListIcon
              style={{
                fontSize: "4rem",
                color: SecondaryColor,
              }}
            />
          </Grid>
          <Grid item xs={12} md={11}>
            Lyric Keeper offers you complete flexibility in the way that you
            store your lyrics. You can even create collections of lyrics to help
            keep things neat and orginized!
          </Grid>
        </Grid>
      </LoggedOutDescriptiveText>
    </LoggedOutInfoSectionWrapper>
    <Link to="/help">
      <Button
        variant="outlined"
        style={{ color: MainGreen, marginTop: "40px", marginBottom: "40px" }}
      >
        More information <RightArrow />
      </Button>
    </Link>
  </Container>
);
