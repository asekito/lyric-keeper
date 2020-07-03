import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { PageHeader, Navbar, PageWrapper } from "GlobalComponents";
import { UseDarkMode } from "Hooks";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import {
  StyledSectionButton,
  StyledDetailsSection,
  Bold,
  StyledIframe,
} from "./elements";

export const HelpPage: React.FC = () => {
  const { darkModeIsEnabled } = UseDarkMode();
  const [dropDownStates, setDropDownStates] = useState({ dd1: false });

  return (
    <>
      <Navbar />
      <PageWrapper isDarkMode={darkModeIsEnabled}>
        <Container maxWidth="md" style={{ paddingBottom: "30px" }}>
          <PageHeader>FAQ</PageHeader>
          <ExpansionPanel
            onChange={() =>
              setDropDownStates(({ dd1, ...rest }) => ({ dd1: !dd1, ...rest }))
            }
          >
            <ExpansionPanelSummary>
              <StyledSectionButton variant="text">
                How do I install the Lyric Keeper app?
                {dropDownStates.dd1 ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </StyledSectionButton>
            </ExpansionPanelSummary>
            {dropDownStates.dd1 && (
              <StyledDetailsSection>
                My goal is for you to be able to enjoy everything Lyric Keeper
                has to offer for free! <br />
                <br />
                Because of this, I specifically built the app on a web based
                platform which is not processed by the Apple or Android app
                stores.
                <br /> <br />
                To make this app available offline, you'll need to{" "}
                <Bold>open Safari</Bold> on your Apple device (detailed
                instructions for Android are not yet available). Then,{" "}
                <Bold>press the "share" button</Bold> found in the upper
                right-hand corner of the screen on an iPad (iPhone users can
                find it at the bottom of their screen). Lastly,{" "}
                <Bold>
                  scroll down in the share menu and select "Add to homescreen"
                  then "Add".
                </Bold>
                <br />
                <br />
                <StyledIframe
                  src="https://giphy.com/embed/dxUTm3WzwSxP3x6C0z"
                  width="360"
                  height="480"
                  frameBorder="0"
                  allowFullScreen
                />
                <br />
                And that's it! The Lyric Keeper app should now be on your
                homescreen!
              </StyledDetailsSection>
            )}
          </ExpansionPanel>
        </Container>
      </PageWrapper>
    </>
  );
};
