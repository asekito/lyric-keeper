import React from "react";
import Container from "@material-ui/core/Container";
import { PageHeader, Navbar } from "GlobalComponents";
import { UseCurrentUser } from "Hooks";

export const HelpPage: React.FC = () => {
  const currenUserDetails = UseCurrentUser();

  return (
    <>
      <Navbar {...currenUserDetails} />
      <Container maxWidth="xs">
        <PageHeader>Help</PageHeader>
      </Container>
    </>
  );
};
