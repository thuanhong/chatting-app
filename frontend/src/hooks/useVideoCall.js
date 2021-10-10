import React, { useCallback, useRef, ForwardedRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('localhost:8000/call');
const senders = [];
let room = null;
export default function useVideoCall(localVideo, remoteVideo) {
  const [userMediaStream, setUserMediaStream] = React.useState(null);
  const onConnected = null;
  const onDisconnected = null;
  const peerConnection = new window.RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });
  let isAlreadyCalling = false;
  let getCalled = false;

  peerConnection.addEventListener('connectionstatechange', (event) => {
    console.log(peerConnection.connectionState);
    const fn = this['_on' + capitalizeFirstLetter(peerConnection.connectionState)];
    fn && fn(event);
  });

  function onCallMade() {
    console.log('call-made');

    socket.on('call-made', async (data) => {
      console.log('call-made 1', data);
      if (getCalled) {
        const confirmed = window.confirm(`User "Socket: ${data.socket}" wants to call you. Do accept this call?`);

        if (!confirmed) {
          socket.emit('reject-call', {
            from: data.socket,
          });

          return;
        }
      }

      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

      socket.emit('make-answer', {
        answer,
        to: data.socket,
      });
      getCalled = true;
    });
  }
  function joinRoom(rooms) {
    room = rooms;
    socket.emit('joinRoom', rooms);
  }

  // Start a RTCPeerConnection to each client
  function onAnswerMade(callback) {
    socket.on('answer-made', async (data) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));

      if (!isAlreadyCalling) {
        callback(data.socket);
        isAlreadyCalling = true;
      }
    });
  }

  function onCallRejected(callback) {
    socket.on('call-rejected', (data) => {
      callback(data);
    });
  }

  function onTrack(callback) {
    peerConnection.ontrack = function({ streams: [stream] }) {
      callback(stream);
    };
  }

  useEffect(() => {
    console.log('video', localVideo.current);
  }, []);

  const createMediaStream = async () => {
    console.log(localVideo);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideo) {
      localVideo.current.srcObject = stream;
      // localVideo.current.play();
    }

    stream.getTracks().forEach((track) => {
      senders.push(peerConnection.addTrack(track, stream));
    });

    setUserMediaStream(stream);
  };
  async function callUser(to) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

    socket.emit('call-user', { offer, to });
  }

  function onRemoveUser(callback) {
    socket.on(`${room}-remove-user`, ({ socketId }) => {
      callback(socketId);
    });
  }

  function onUpdateUserList(callback) {
    socket.on(`${room}-update-user-list`, ({ users }) => {
      callback(users);
    });
  }

  function stopCall() {
    console.log('stop Call', localVideo);
    const stream = localVideo.current.srcObject;
    const streamRemote = remoteVideo.current.srcObject;
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
    setUserMediaStream(null);
    // localVideo.current.srcObject = null;
  }

  return {
    onCallMade,
    onRemoveUser,
    onUpdateUserList,
    callUser,
    stopCall,
    onAnswerMade,
    onCallRejected,
    onTrack,
    joinRoom,
    userMediaStream,
    setUserMediaStream,
    peerConnection,
    createMediaStream,
  };
}
