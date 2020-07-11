import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { PageHeader, Navbar, PageWrapper, Image } from "GlobalComponents";
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
  const [dropDownStates, setDropDownStates] = useState({
    dd1: false,
    dd2: false,
    dd3: false,
  });

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
          <ExpansionPanel
            onChange={() =>
              setDropDownStates(({ dd2, ...rest }) => ({ dd2: !dd2, ...rest }))
            }
          >
            <ExpansionPanelSummary>
              <StyledSectionButton variant="text">
                Do I need an account to use Lyric Keeper?
                {dropDownStates.dd1 ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </StyledSectionButton>
            </ExpansionPanelSummary>
            {dropDownStates.dd2 && (
              <StyledDetailsSection>
                To keep Lyric Keeper free and safe for its' users, I put the
                following set of rules in place:
                <br />
                <br />
                <Bold>
                  1. Anyone who uses Lyric Keeper may view any lyrics created by
                  other users of the app
                </Bold>
                <br />
                <br />
                <Bold>2. Only confirmed users may create lyrics</Bold>
                <br />
                <br />
                <Bold>
                  3. Lyrics may only be deleted by the user who created them
                </Bold>
              </StyledDetailsSection>
            )}
          </ExpansionPanel>
          <ExpansionPanel
            onChange={() =>
              setDropDownStates(({ dd3, ...rest }) => ({ dd3: !dd3, ...rest }))
            }
          >
            <ExpansionPanelSummary>
              <StyledSectionButton variant="text">
                How do I create a lyric?
                {dropDownStates.dd1 ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </StyledSectionButton>
            </ExpansionPanelSummary>
            {dropDownStates.dd3 && (
              <StyledDetailsSection>
                <Bold>
                  Please note: you must be logged in to create a lyric.
                </Bold>
                <br />
                <br />
                First, <Bold>go to the homescreen of the app</Bold> and{" "}
                <Bold>click the "New Lyric" button</Bold> (found in the lower
                right-hand corner of the screen).
                <br />
                <br />
                <div
                  style={{
                    textAlign: "center",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  <Image
                    alt="New Lyric button pic"
                    src="https://lyric-keeper.s3.amazonaws.com/new-lyric-button.png"
                  />
                </div>
                <br />
                Once the New Lyric modal has opened, you can start filling out
                the provided fields. <Bold>Note:</Bold> Lyric Keeper was built
                to make your life easier as a musician! With Lyric Keeper, you
                can easily avoid copying and re-pasting your chorus over and
                over again. Simply paste your chorus into the{" "}
                <Bold>Chorus</Bold> field, then type <Bold>(chorus)</Bold>{" "}
                anywhere in the <Bold>Verses</Bold> section you'd like the
                chorus to go.
                <br />
                <br />
                <Image
                  width="100%"
                  alt="New Lyric button pic"
                  src="https://lyric-keeper.s3.amazonaws.com/new-lyric-form.png"
                />
                <br />
              </StyledDetailsSection>
            )}
          </ExpansionPanel>
        </Container>
      </PageWrapper>
    </>
  );
};
