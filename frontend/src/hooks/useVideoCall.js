import React, { useCallback, useRef, ForwardedRef, useEffect } from 'react';
import io from 'socket.io-client';

let room = null;
export default function useVideoCall(localVideo, remoteVideo) {
  const onConnected = null;
  const onDisconnected = null;
  const socket = io('localhost:8000/call');
  const senders = [];
  const peerConnection = new window.RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });
  let isAlreadyCalling = false;
  let getCalled = false;

  peerConnection.addEventListener('connectionstatechange', (event) => {
    console.log(peerConnection.connectionState);
    // const fn = this['_on' + capitalizeFirstLetter(peerConnection.connectionState)];
    const fn = ['_on' + capitalizeFirstLetter(peerConnection.connectionState)];

    fn && fn(event);
  });

  function joinRoom(rooms) {
    room = rooms;
    socket.emit('joinRoom', rooms);
  }
  function onCallMade() {
    socket.on('call-made', async (data) => {
      if (getCalled) {
        const confirmed = window.confirm(`User "Socket: ${data.socket}" wants to call you. Do accept this call?`);

        if (!confirmed) {
          socket.emit('reject-call', {
            from: data.socket,
          });

          return;
        }
      }

      await peerConnection.setRemoteDescription(data.offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      socket.emit('make-answer', {
        answer,
        to: data.socket,
      });
      getCalled = true;
    });
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

  // Start a RTCPeerConnection to each client
  function onAnswerMade(callback) {
    console.log('isAlreadyCalling', isAlreadyCalling);

    socket.on('answer-made', async (data) => {
      await peerConnection.setRemoteDescription(data.answer);
      alert(isAlreadyCalling);
      if (!isAlreadyCalling) {
        await createMediaStream();
        console.log('JOIN CALL BACK');
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

  const createMediaStream = async () => {
    console.log(localVideo);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    if (localVideo) {
      localVideo.current.srcObject = stream;
      // localVideo.current.play();
    }

    stream.getTracks().forEach((track) => {
      senders.push(peerConnection.addTrack(track, stream));
    });
  };
  async function callUser(to) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log('call back to another user');
    socket.emit('call-user', { offer, to });
  }

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
    // localVideo.current.srcObject = null;
  }

  onCallMade();
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
    peerConnection,
    createMediaStream,
  };
}
