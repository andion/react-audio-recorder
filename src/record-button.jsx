import {
  CgPlayStopR,
  CgPlayPauseR,
  CgPlayButtonR,
  CgRecord,
} from "react-icons/cg";
import PropTypes from "prop-types";

// state =inactive, recording, paused.
const Buttons = ({ recording, state, onRecord, onPause, onStop }) => {
  switch (state) {
    case "inactive":
      return <CgRecord className="icon" onClick={onRecord} />;
    case "recording":
      return (
        <>
          <CgPlayStopR className="icon" onClick={onStop} />
          <CgPlayPauseR className="icon" onClick={onPause} />
        </>
      );
    case "paused":
      return (
        <>
          <CgPlayStopR className="icon" onClick={onStop} />
          <CgPlayButtonR className="blink icon" onClick={onRecord} />
        </>
      );
    default:
      return null;
  }
};

const RecordButton = ({ className, ...rest }) => (
  <div className={className}>
    <Buttons {...rest} />
  </div>
);

RecordButton.propTypes = {
  state: PropTypes.oneOf(["inactive", "recording", "paused"]), //https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/state
  onRecord: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};

export default RecordButton;
