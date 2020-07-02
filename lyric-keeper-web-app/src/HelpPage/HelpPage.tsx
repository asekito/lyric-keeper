import React from "react";
import Container from "@material-ui/core/Container";
import { PageHeader, Navbar, PageWrapper } from "GlobalComponents";
import { UseCurrentUser, UseDarkMode } from "Hooks";

export const HelpPage: React.FC = () => {
  const currenUserDetails = UseCurrentUser();
  const { darkModeIsEnabled } = UseDarkMode();

  return (
    <>
      <Navbar {...currenUserDetails} />
      <PageWrapper isDarkMode={darkModeIsEnabled}>
        <Container maxWidth="xs">
          <PageHeader>Help</PageHeader>
        </Container>
      </PageWrapper>
    </>
  );
};
