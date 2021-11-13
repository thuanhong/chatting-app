import io from 'socket.io-client';
import React, { useState } from 'react';
let room = null;
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/call`);
let peerConnection = null;
if (typeof window !== 'undefined') {
  // browser code
  peerConnection = new window.RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });
}

export default function useVideoCall() {
  let isAlreadyCalling = false;
  let getCalled = false;

  peerConnection.addEventListener('connectionstatechange', (event) => {
    console.log(peerConnection.connectionState);
    const fn = ['_on' + capitalizeFirstLetter(peerConnection.connectionState)];
    // fn && fn(event);
  });

  function joinRoom(rooms, userId) {
    room = rooms;
    socket.emit('joinRoom', { rooms, userId });
  }
  function onCallMade(callback) {
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
      await peerConnection.setRemoteDescription(new window.RTCSessionDescription(data.offer));
      // await peerConnection.addIceCandidate(data.candidate);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(new window.RTCSessionDescription(answer));

      socket.emit('make-answer', {
        answer,
        to: data.socket,
      });
      getCalled = true;
      await callback();
      return;
    });
    socket.on('stop-call', async (data) => {
      stopCall(data);
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
    socket.on('answer-made', async (data) => {
      await peerConnection.setRemoteDescription(new window.RTCSessionDescription(data.answer));
      console.log('OUT CALL BACK');

      if (!isAlreadyCalling) {
        console.log('JOIN CALL BACK');
        isAlreadyCalling = true;
        await callback(data.userId);
        return;
      }
    });
  }

  function onCallRejected(callback) {
    socket.on('call-rejected', (data) => {
      callback(data);
    });
  }

  function onTrack(callback) {
    setTimeout(
      () =>
        (peerConnection.ontrack = function({ streams: [stream] }) {
          callback(stream);
        }),
      2000,
    );
  }
  async function callUser(userId) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new window.RTCSessionDescription(offer));
    // const candidate = (peerConnection.onicecandidate = (event) => event.candidate);
    const candidate = peerConnection.onicecandidate;

    console.log('call back to another user', peerConnection.onicecandidate);
    socket.emit('call-user', { offer, userId, candidate });
  }

  return {
    onCallMade,
    onRemoveUser,
    onUpdateUserList,
    callUser,

    onAnswerMade,
    onCallRejected,
    onTrack,
    joinRoom,
    peerConnection,
    isAlreadyCalling,
    getCalled,
  };
}

// export const createPeerConnectionContext = () => {
//   const peerConnection = new RTCPeerConnection({
//     iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//   });
//   console.log('Socket URL', process.env.REACT_APP_SOCKET_URL);
//   const socket = io(process.env.REACT_APP_SOCKET_URL);

//   return new PeerConnectionSession(socket, peerConnection);
// };
