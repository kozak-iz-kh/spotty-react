import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { PlayArrow, Pause, SkipPrevious, SkipNext } from "@material-ui/icons";
import Slider from "@material-ui/lab/Slider";
import StarsRating from "../shared/StarsRating";
import DotsMenu from "../shared/DotsMenu/DotsMenu";

import PropTypes from "prop-types";

const styles = theme => ({
  mediaPlayerAligner: {
    userSelect: "none",
    position: "fixed",
    zIndex: 3,
    bottom: 0,
    width: "100%",
    transition: "all 0.6s ease-in-out"
  },
  mediaPlayer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fefefe",
    height: theme.props.mediaPlayer.mediaPlayerHeight
  },
  audioInfoContainer: {
    flexBasis: "33%"
  },
  audioInfo: {
    display: "flex"
  },
  imageContainer: {
    height: "6.75rem"
  },
  image: {
    width: "6.5rem",
    height: "6.75rem"
  },
  audioInfoText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    marginLeft: "1.56rem"
  },
  songInfo: {
    fontWeight: "bold"
  },
  albumArtistInfo: {
    fontWeight: "semi-bold"
  },
  controlsContainer: {
    display: "flex",
    alignItems: "center"
  },
  controls: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  volumeControls: {
    display: "flex",
    alignItems: "center"
  },
  volumeBar: {
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    marginLeft: "2rem",
    color: "gray"
  },
  volumeSlider: {
    height: "0.2rem",
    width: "6rem",
    marginLeft: "0.625rem"
  },
  threeDotsMenu: {
    marginRight: "1rem"
  },
  prevNextButton: {
    margin: 0,
    padding: 0,
    color: "white",
    background: "#838383",
    minWidth: "2rem",
    minHeight: "1rem"
  },
  playButtonContainer: {
    width: "4.5rem",
    height: "4.5rem",
    marginRight: "1.25rem",
    marginLeft: "1.25rem"
  },
  playButtonStateIcon: {
    fontSize: "2.8rem"
  },
  threeDotMenu: {
    marginRight: "1.5rem",
    color: "gray"
  }
});

const Player = ({
  classes,
  onPlay,
  isPlaying,
  onChangeProgress,
  progress,
  song,
  volume,
  volumeIcon,
  onChangeVolume,
  onMute,
  onChangeProgressStart,
  onChangeProgressEnd,
  items
}) => (
  <div className={classes.mediaPlayerAligner}>
    <div className={classes.mediaPlayer}>
      <Slider
        value={progress}
        onChange={onChangeProgress}
        onDragStart={onChangeProgressStart}
        onDragEnd={onChangeProgressEnd}
      />
      <div className={classes.audioInfoContainer}>
        <div className={classes.audioInfo}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={song.title} alt="album title" />
          </div>
          <div className={classes.audioInfoText}>
            <Typography variant="h6" className={classes.songInfo}>
              {song.songName}
            </Typography>
            <Typography component="h2" className={classes.albumArtistInfo}>
              {song.albumName} - {song.authorName}
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.controlsContainer}>
        <div className={classes.controls}>
          <Button className={classes.prevNextButton} variant="contained">
            {<SkipPrevious fontSize={"large"} />}
          </Button>
          <Button
            className={classes.playButtonContainer}
            onClick={onPlay}
            variant="fab"
            color="primary"
            aria-label="Play"
          >
            {isPlaying && <Pause className={classes.playButtonStateIcon} />}
            {!isPlaying && (
              <PlayArrow className={classes.playButtonStateIcon} />
            )}
          </Button>
          <Button className={classes.prevNextButton} variant="contained">
            {<SkipNext fontSize={"large"} />}
          </Button>
        </div>
        <div className={classes.volumeControls}>
          <div className={classes.volumeBar}>
            <div role="button" onClick={onMute}>
              {volumeIcon}
            </div>
          </div>
          <div className={classes.volumeSlider}>
            <Slider
              className={classes.volumeSlider}
              value={volume}
              max={1}
              onChange={onChangeVolume}
            />
          </div>
        </div>
      </div>
      <div>
        <StarsRating />
      </div>
      <div className={classes.threeDotMenu}>
        <DotsMenu items={items} />
      </div>
    </div>
  </div>
);

Player.propTypes = {
  classes: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onChangeProgress: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  onChangeVolume: PropTypes.func.isRequired,
  volumeIcon: PropTypes.element.isRequired,
  song: PropTypes.shape({
    source: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
    albumName: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired
  }),
  onMute: PropTypes.func.isRequired,
  onChangeProgressStart: PropTypes.func.isRequired,
  onChangeProgressEnd: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(Player);
