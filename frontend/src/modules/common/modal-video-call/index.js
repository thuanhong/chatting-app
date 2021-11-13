import React, { useState, useRef, useEffect } from 'react';
import { Box, ButtonBase } from '@material-ui/core';
import { useStyles } from './styles';
import { CallEnd } from '@material-ui/icons';

const senders = [];
function VideoCallModal(props) {
  const classes = useStyles();
  // const localVideo = useRef();
  // const remoteVideo = useRef();
  const [userMediaStream, setUserMediaStream] = useState(null);
  // const [displayMediaStream, setDisplayMediaStream] = useState(null);
  // const [startTimer, setStartTimer] = useState(false);
  const { senderId, isCalling, setIsCalling, peerConnection, remoteVideo, localVideo } = props;

  async function stopCall() {
    console.log('stop Call', localVideo);
    const stream = await localVideo.current?.srcObject;
    const streamRemote = await remoteVideo.current?.srcObject;
    const tracks = stream?.getTracks();
    if (!tracks) {
      return;
    }

    tracks.forEach(function(track) {
      track.stop();
    });

    const tracksRemote = streamRemote?.getTracks();
    if (!tracksRemote) {
      return;
    }

    tracksRemote.forEach(function(track) {
      track.stop();
    });
    localVideo.current.srcObject = null;
    remoteVideo.current.srcObject = null;
    socket.emit('make-stop-call', to);
  }

  useEffect(() => {
    const createMediaStream = async () => {
      if (!userMediaStream) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 640, ideal: 1920 },
            height: { min: 400, ideal: 1080 },
            aspectRatio: { ideal: 1.7777777778 },
          },
          audio: true,
        });

        if (localVideo) {
          localVideo.current.srcObject = stream;
        }

        stream.getTracks().forEach((track) => {
          senders.push(peerConnection.addTrack(track, stream));
        });

        setUserMediaStream(stream);
      }
    };

    createMediaStream();
  }, [MediaStream]);

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.remoteVideo}>
          <video className={classes.video} ref={remoteVideo} autoPlay></video>
        </div>
        <div className={classes.localVideo}>
          <video className={classes.video} ref={localVideo} autoPlay muted></video>
        </div>
      </div>
      <div>
        <ButtonBase
          onClick={() => {
            console.log('senderId', senderId);
            stopCall();
            setIsCalling(!isCalling);
          }}
        >
          <CallEnd style={{ width: '40', height: '40', color: 'red' }} />
        </ButtonBase>
      </div>
    </div>
  );
}

export default VideoCallModal;
