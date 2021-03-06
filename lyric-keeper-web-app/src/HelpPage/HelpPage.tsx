import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { PageHeader, Navbar, PageWrapper, Image, Link } from "GlobalComponents";
import { UseDarkMode } from "Hooks";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Delete from "@material-ui/icons/Delete";
import Share from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {
  StyledSectionButton,
  StyledDetailsSection,
  Bold,
  StyledIframe,
  Italic,
} from "./elements";
import Snackbar from "@material-ui/core/Snackbar";

interface LinkNumberShape {
  linkNumber: number;
}

const Spacer = () => (
  <>
    <br />
    <br />
  </>
);

export const HelpPage: React.FC = () => {
  const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
  const { darkModeIsEnabled } = UseDarkMode();

  const handleClose = () => setSnackBarIsOpen(false);

  const windowSearchQuery = parseInt(
    window.location.search.slice(3, window.location.search.length),
    10
  );

  const [dropDownStates, setDropDownStates] = useState({
    dd1: windowSearchQuery === 1,
    dd2: windowSearchQuery === 2,
    dd3: windowSearchQuery === 3,
    dd4: windowSearchQuery === 4,
    dd5: windowSearchQuery === 5,
  });

  const copyStringToClipboard = (string: string) => {
    navigator.clipboard.writeText(string).then(() => setSnackBarIsOpen(true));
  };

  const generateLink = ({ linkNumber }: LinkNumberShape) =>
    `lyric-keeper.netlify.com/help/?q=${linkNumber}`;

  const ShareIcon: React.FC<LinkNumberShape> = ({ linkNumber }) => (
    <IconButton
      onClick={() => copyStringToClipboard(generateLink({ linkNumber }))}
    >
      <Share />
    </IconButton>
  );
  return (
    <>
      <Navbar />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackBarIsOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Link copied to clipboard"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <PageWrapper isDarkMode={darkModeIsEnabled}>
        <Container maxWidth="md" style={{ paddingBottom: "30px" }}>
          <PageHeader style={{ marginBottom: "30px" }}>FAQ</PageHeader>
          <ExpansionPanel
            expanded={dropDownStates.dd1}
            onChange={() =>
              setDropDownStates(({ dd1, ...rest }) => ({ dd1: !dd1, ...rest }))
            }
          >
            <ExpansionPanelSummary expandIcon={<ArrowDropDownIcon />}>
              <StyledSectionButton variant="text">
                How do I install the Lyric Keeper app?
              </StyledSectionButton>
              <ShareIcon linkNumber={1} />
            </ExpansionPanelSummary>
            <StyledDetailsSection>
              My goal is for you to be able to enjoy everything Lyric Keeper has
              to offer for free! <Spacer />
              Because of this, I specifically built the app on a web based
              platform which is not processed by the Apple or Android app
              stores.
              <Spacer />
              To make this app available offline, you'll need to{" "}
              <Bold>open Safari</Bold> on your Apple device (detailed
              instructions for Android are not yet available). Then,{" "}
              <Bold>press the "share" button</Bold> found in the upper
              right-hand corner of the screen on an iPad (iPhone users can find
              it at the bottom of their screen). Lastly,{" "}
              <Bold>
                scroll down in the share menu and select "Add to homescreen"
                then "Add".
              </Bold>
              <Spacer />
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
          </ExpansionPanel>
          <ExpansionPanel
            expanded={dropDownStates.dd2}
            onChange={() =>
              setDropDownStates(({ dd2, ...rest }) => ({ dd2: !dd2, ...rest }))
            }
          >
            <ExpansionPanelSummary expandIcon={<ArrowDropDownIcon />}>
              <StyledSectionButton variant="text">
                Do I need an account to use Lyric Keeper?
              </StyledSectionButton>
              <ShareIcon linkNumber={2} />
            </ExpansionPanelSummary>
            <StyledDetailsSection>
              To keep Lyric Keeper free and safe for its' users, I put the
              following set of rules in place:
              <Spacer />
              <Bold>
                1. Anyone who uses Lyric Keeper may view any lyrics created by
                other users of the app (except for lyrics marked as private)
              </Bold>
              <Spacer />
              <Bold>2. Only confirmed users may create lyrics</Bold>
              <Spacer />
              <Bold>
                3. Lyrics may only be deleted by the user who created them
              </Bold>
              <Spacer />
              <Bold>
                4. Lyrics may only be edited by the user who created them
              </Bold>
            </StyledDetailsSection>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={dropDownStates.dd3}
            onChange={() =>
              setDropDownStates(({ dd3, ...rest }) => ({ dd3: !dd3, ...rest }))
            }
          >
            <ExpansionPanelSummary expandIcon={<ArrowDropDownIcon />}>
              <StyledSectionButton variant="text">
                How do I create a lyric?
              </StyledSectionButton>
              <ShareIcon linkNumber={3} />
            </ExpansionPanelSummary>
            <StyledDetailsSection>
              <Bold>Please note: you must be logged in to create a lyric.</Bold>
              <Spacer />
              First, <Bold>go to the homescreen of the app</Bold> and{" "}
              <Bold>click the "New Lyric" button</Bold> (found in the lower
              right-hand corner of the screen).
              <Spacer />
              <div
                style={{
                  textAlign: "center",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <Image
                  alt="New Lyric button"
                  src="https://lyric-keeper.s3.amazonaws.com/new-lyric-button.png"
                />
              </div>
              <br />
              Once the New Lyric modal has opened, you can start filling out the
              provided fields. <Bold>Note:</Bold> Lyric Keeper was built to make
              your life easier as a musician! With Lyric Keeper, you can easily
              avoid copying and re-pasting your chorus over and over again.
              Simply paste your chorus into the <Bold>Chorus</Bold> field, then
              type <Bold>(chorus)</Bold> anywhere in the <Bold>Verses</Bold>{" "}
              section you'd like the chorus to go.
              <Spacer />
              <Image
                width="100%"
                alt="New Lyric form"
                src="https://lyric-keeper.s3.amazonaws.com/new-lyric-form.png"
              />
              <br />
            </StyledDetailsSection>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={dropDownStates.dd4}
            onChange={() =>
              setDropDownStates(({ dd4, ...rest }) => ({ dd4: !dd4, ...rest }))
            }
          >
            <ExpansionPanelSummary expandIcon={<ArrowDropDownIcon />}>
              <StyledSectionButton variant="text">
                How do I edit or delete a lyric?
              </StyledSectionButton>
              <ShareIcon linkNumber={4} />
            </ExpansionPanelSummary>
            <StyledDetailsSection>
              <Bold>
                Note: You may only edit/delete lyrics that you have created
              </Bold>
              <Spacer />
              <Bold>EDITING LYRICS:</Bold>
              <Spacer />
              To edit a lyric, simply open the lyric by clicking on its' name.
              You can find a list of all the lyrics you've created by
              <Bold>
                navigating to{" "}
                <Link to="/my-lyrics">
                  <Italic>/my-lyrics</Italic>
                </Link>
              </Bold>{" "}
              or by{" "}
              <Bold>
                clicking the user icon found in the top-right corner of your
                screen, then clicking "My Lyrics"
              </Bold>
              .
              <Spacer />
              <Bold>DELETING LYRICS:</Bold>
              <Spacer />
              To delete a lyric, first <Bold>
                navigate to "/my-lyrics"
              </Bold> or{" "}
              <Bold>
                click the user icon found in the top-right corner of your
                screen, then click "My Lyrics".
              </Bold>
              Next, simply click the trash can icon (<Delete />) on the lyric
              you wish to delete
            </StyledDetailsSection>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={dropDownStates.dd5}
            onChange={() =>
              setDropDownStates(({ dd5, ...rest }) => ({ dd5: !dd5, ...rest }))
            }
          >
            <ExpansionPanelSummary expandIcon={<ArrowDropDownIcon />}>
              <StyledSectionButton variant="text">
                What are playlists & how can i use them?
              </StyledSectionButton>
              <ShareIcon linkNumber={5} />
            </ExpansionPanelSummary>
            <StyledDetailsSection>
              <Bold>What are playlists?</Bold>
              <Spacer />
              Playlists allow you to group together lyrics. Their primary
              purpose is to provide you with an easy way of keeping track of
              your lyrics. For example, you may decide you want to play a set of
              slow songs at your next gig. Without creating a playlist, you
              would need to either memorize your set list or write it down
              somewhere. Both options have disadvantages which I believe are
              alleviated by playlists.
              <Spacer />
              <Bold>HOW CAN I USE THEM?</Bold>
              <Spacer />
              <Bold>Creating playlists: </Bold>
              <Spacer />
              To create a playlist, first either:
              <Spacer />
              <Bold>1.</Bold> Click on the user icon in the top right-hand
              corner of the screen. Click "My Playlists". Next, click the "New
              playlist" button.
              <Spacer />
              <Bold>––––– or –––––</Bold>
              <Spacer />
              <Bold>2.</Bold> Visit{" "}
              <Link to="/my-playlists">
                <Italic>/my-playlists</Italic>
              </Link>
              . And click the "New playlist" button.
              <Spacer />
              From the new playlist screen you can begin customizing your list.
              Add a name and select a few lyrics to get started. Lastly, click
              the save button.
              <Spacer />
              And you're done!
              <Spacer />
              <Bold>Editing playlists: </Bold>
              <Spacer />
              From the "My Playlists" screen, open the playlist you'd like to
              edit. The directions from this point should be fairly self
              explanatory. You can:
              <Spacer />
              <Bold>•</Bold> Drag lyrics to rearange them
              <Spacer />
              <Bold>•</Bold> Change the name of the playlist by using the input
              at the top of the screen
              <Spacer />
              <Bold>•</Bold> Delete lyrics from the playlist by clicking the
              delete button on the lyric you'd like to delete.
              <Spacer />
              <Bold>Deleting playlists:</Bold>
              <Spacer />
              From the "My Playlists" screen, open the playlist you'd like to
              delete. Next, click the "Edit" button. Finally, click the "Delete
              Playlist" button and click "Yes", when prompted.
            </StyledDetailsSection>
          </ExpansionPanel>
        </Container>
      </PageWrapper>
    </>
  );
};
