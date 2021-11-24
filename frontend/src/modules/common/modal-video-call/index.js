'use strict';
import React, { useState, useRef, useEffect } from 'react';
import { Box, ButtonBase } from '@material-ui/core';
import { useStyles } from './styles';
import { CallEnd } from '@material-ui/icons';
import { useGlobalStore } from '@src/hooks';
function filterTrickle(sdp) {
  return sdp.replace(/a=ice-options:trickle\s\n/g, '');
}

const senders = [];
//# TODO
let listLocalConnection = [];
let listRemoteConnection = [];
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
  const { senderId, isCalling, setIsCalling, socket, remoteVideo, localVideo, setIsCalled, isCalled } = props;

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
  }

  const initConnection = (stream, socket, remoteVideo, localVideo) => {
    let localConnection;
    let remoteConnection;
    let configRTC = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    // let conn;
    console.log('INIT');

    // Start a RTCPeerConnection to each client
    socket.on('other-users', (socketId) => {
      console.log('other user');
      // Ignore when not exists other users connected

      // Ininit peer connection
      localConnection = new RTCPeerConnection(configRTC);
      localConnection.restartIce();
      // conn = localConnection;
      // Add all tracks from stream to peer connection
      stream.getTracks().forEach((track) => localConnection.addTrack(track, stream));

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
        .createOffer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1, iceRestart: true })
        .then((offer) => localConnection.setLocalDescription(offer))
        .then(() => {
          socket.emit('offer', { socketId, description: localConnection.localDescription });
        });
      console.log('localTRICKLE', localConnection.canTrickleIceCandidates);
    });

    socket.on('offer', (data) => {
      // Ininit peer connection
      console.log('offer', data.socketId);
      console.log('des', data.description);
      remoteConnection = new RTCPeerConnection(configRTC);
      // conn = remoteConnection;
      remoteConnection.restartIce();
      // remoteConnection.setConfiguration({ iceRestart: true });

      // Add all tracks from stream to peer connection
      stream.getTracks().forEach((track) => remoteConnection.addTrack(track, stream));

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
        .then(async (answer) => await remoteConnection.setLocalDescription(answer))
        .then(() => {
          console.log('answer', data.socketId);
          console.log('answerDes', remoteConnection.localDescription);

          socket.emit('answer', { socketId: data.socketId, description: remoteConnection.localDescription });
        });
      console.log('after answer');
      console.log('remoteTRICKLE', remoteConnection.canTrickleIceCandidates);
    });

    socket.on('answer', (data) => {
      console.log('get Answer');

      // if (!data) {
      //   console.log('get Answer', data.description);

      localConnection.setRemoteDescription(new RTCSessionDescription(data.description));
      // }
    });

    // Receive candidates and add to peer connection
    socket.on('candidate', (candidate) => {
      // GET Local or Remote Connection
      const connection = localConnection || remoteConnection;
      // candidate.usernameFragment = null;
      if (!connection) return;
      connection.addIceCandidate(new RTCIceCandidate(candidate));
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
        initConnection(stream, socket, remoteVideo, localVideo);

        setUserMediaStream(stream);
      }
    };

    createMediaStream();
  }, [userMediaStream]);

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
            console.log('senderId', senderId);
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
