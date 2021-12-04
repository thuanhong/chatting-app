'use strict';
import React, { useState, useRef, useEffect } from 'react';
import { Box, ButtonBase } from '@material-ui/core';
import { useStyles } from './styles';
import { CallEnd } from '@material-ui/icons';
import { useGlobalStore } from '@src/hooks';
function filterTrickle(sdp) {
  return sdp.replace(/a=ice-options:trickle\s\n/g, '');
}

const sender = [];
//# TODO
let listLocalConnection = [];
let listRemoteConnection = [];
// let localConnection;
// let remoteConnection;

// if (typeof window !== 'undefined') {
//   // browser code
//   localConnection = new window.RTCPeerConnection({
//     iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//   });

//   remoteConnection = new window.RTCPeerConnection({
//     iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//   });
// }

function VideoCallModal(props) {
  const classes = useStyles();
  const { groupChatStore } = useGlobalStore();

  const { infoUser } = groupChatStore.currentGroupChatInfo;
  // const localVideo = useRef();
  // const remoteVideo = useRef();
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [userMediaStream, setUserMediaStream] = useState(null);
  // const [displayMediaStream, setDisplayMediaStream] = useState(null);
  // const [startTimer, setStartTimer] = useState(false);
  const { senderId, isCalling, setIsCalling, socket, remoteVideo, localVideo, setIsCalled, isCalled, localConnection, remoteConnection } = props;

  async function stopCall() {
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
  }

  const initConnection = (stream, socket, remoteVideo, localVideo, localConnection, remoteConnection) => {
    // let localConnection;
    // let remoteConnection;
    let configRTC = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    // let conn;
    // Start a RTCPeerConnection to each client
    socket.on('other-users', (socketId) => {
      // Ignore when not exists other users connected

      // Add all tracks from stream to peer connection
      sender.push(stream.getTracks().forEach((track) => localConnection.addTrack(track, stream)));

      // Send Candidtates to establish a channel communication to send stream and data
      localConnection.onicecandidate = ({ candidate }) => {
        candidate && socket.emit('candidate', { socketId, candidate });
      };

      // Receive stream from remote client and add to remote video area
      localConnection.ontrack = ({ streams: [stream] }) => {
        if (!remoteVideo.current) return;
        remoteVideo.current.srcObject = stream;
      };

      localConnection
        .createOffer()
        .then((offer) => localConnection.setLocalDescription(new window.RTCSessionDescription(offer)))
        .then(() => {
          socket.emit('offer', { socketId, description: localConnection.localDescription });
        });
    });

    socket.on('offer', (data) => {
      // Ininit peer connection

      // Add all tracks from stream to peer connection
      sender.push(stream.getTracks().forEach((track) => remoteConnection.addTrack(track, stream)));

      // Send Candidtates to establish a channel communication to send stream and data
      remoteConnection.onicecandidate = ({ candidate }) => {
        candidate && socket.emit('candidate', { socketId: data.socketId, candidate });
      };

      // Receive stream from remote client and add to remote video area
      remoteConnection.ontrack = ({ streams: [stream] }) => {
        remoteVideo.current.srcObject = stream;
      };

      remoteConnection
        .setRemoteDescription(new RTCSessionDescription(data.description))
        .then(async () => await remoteConnection.createAnswer())
        .then(async (answer) => await remoteConnection.setLocalDescription(new window.RTCSessionDescription(answer)))
        .then(() => socket.emit('answer', { socketId: data.socketId, description: remoteConnection.localDescription }));
    });

    socket.on('answer', (data) => {
      localConnection.setRemoteDescription(new RTCSessionDescription(data.description));
    });

    // Receive candidates and add to peer connection
    socket.on('candidate', (candidate) => {
      // GET Local or Remote Connection
      const connection = localConnection || remoteConnection;
      // candidate.usernameFragment = null;
      if (!connection) return;
      connection.addIceCandidate(new RTCIceCandidate(candidate)).catch((e) => console.log());
    });
    return;
  };

  useEffect(() => {
    const createMediaStream = async () => {
      if (!userMediaStream) {
        const configVideo = {
          video: {
            width: { min: 640, ideal: 1920 },
            height: { min: 400, ideal: 1080 },
            aspectRatio: { ideal: 1.7777777778 },
          },
          audio: true,
        };
        const stream = await navigator.mediaDevices.getUserMedia(configVideo);
        localVideo.current.srcObject = stream;
        initConnection(stream, socket, remoteVideo, localVideo, localConnection, remoteConnection);

        setUserMediaStream(stream);
      }
    };
    createMediaStream();
    return async () => {
      socket.off('candidate');
      socket.off('offer');
      socket.off('other-users');
      socket.off('answer');
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
    };
  }, []);

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
      <div style={{ display: 'flex', paddingLeft: '47%', paddingTop: '7px' }}>
        <ButtonBase
          onClick={() => {
            stopCall();
            setIsCalling(false);
          }}
        >
          <CallEnd style={{ width: '50', height: '50', color: 'red' }} />
        </ButtonBase>
      </div>
    </div>
  );
}

export default VideoCallModal;
