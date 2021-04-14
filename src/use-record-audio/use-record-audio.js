import { useEffect, useState } from "react";

const requestRecorder = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
};

const useRecordAudio = () => {
  const [audio, setAudio] = useState([]);
  const [error, setError] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = () => {
    mediaRecorder.state === "paused"
      ? mediaRecorder.resume()
      : mediaRecorder.start();
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setSeconds(0);
  };

  const pauseRecording = () => {
    mediaRecorder.state === "paused"
      ? mediaRecorder.resume()
      : mediaRecorder.pause();
  };

  const getAudioUrl = () => {
    const blob = new Blob(audio, { type: "audio/mp3" });
    return window.URL.createObjectURL(blob);
  };

  const handleData = (e) => {
    setAudio((audio) => audio.concat(e.data));
  };

  useEffect(() => {
    requestRecorder().then(setMediaRecorder).catch(setError);
  }, []);

  useEffect(() => {
    mediaRecorder?.addEventListener("dataavailable", handleData);
    return () =>
      mediaRecorder?.removeEventListener("dataavailable", handleData);
  }, [mediaRecorder]);

  useEffect(() => {
    let timeout;
    if (mediaRecorder?.state === "recording") {
      timeout = setTimeout(() => {
        mediaRecorder.requestData();
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [seconds, mediaRecorder]);

  const state = {
    inactive: audio.length ? "finished" : "inactive",
    paused: "paused",
    recording: "recording",
  }[mediaRecorder?.state];

  return {
    getAudioUrl,
    seconds,
    state,
    startRecording,
    pauseRecording,
    stopRecording,
    error,
  };
};

export default useRecordAudio;
