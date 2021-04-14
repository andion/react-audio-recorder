import useRecordAudio from "./use-record-audio";
import RecordButton from "./record-button";
import clsx from "clsx";

const ElapsedTime = ({ className, seconds, paused }) => {
  return (
    <span className={clsx(paused && "blink", className)}>{seconds} sec.</span>
  );
};

const AudioPlayer = ({ src }) => <audio className="audio" src={src} controls />;

const RecordAudioError = ({ className, error }) => (
  <div className={clsx(className, "error")}>
    <p>Error: {error?.message}</p>
  </div>
);

const AudioRecorder = ({ className }) => {
  const {
    getAudioUrl,
    seconds,
    state,
    startRecording,
    stopRecording,
    pauseRecording,
    error,
  } = useRecordAudio();

  const paused = state === "paused";
  const finished = state === "finished";

  // Safari won't infer the blob type from the url blob since it has no extension
  //  https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Cross-browser_audio_basics#basic_audio_example
  // ALso, ogg seems to not work in Safari: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers

  if (error) {
    return <RecordAudioError error={error} />;
  }

  return (
    <>
      <div className={clsx("audioRecorder", className)}>
        {finished ? (
          <AudioPlayer src={getAudioUrl()} />
        ) : (
          <>
            <RecordButton
              className="recordButtons"
              state={state}
              onRecord={startRecording}
              onPause={pauseRecording}
              onStop={stopRecording}
            />
            <ElapsedTime
              className="recordTime"
              seconds={seconds}
              paused={paused}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AudioRecorder;
