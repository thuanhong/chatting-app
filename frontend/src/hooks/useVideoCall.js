import React, { useCallback, useRef, ForwardedRef, useEffect } from 'react';
import io from 'socket.io-client';

export default function useVideoCall(localVideo, remoteVideo) {
  const socket = io('localhost:8000/chat');
  const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });

  isAlreadyCalling = false;
  getCalled = false;

  peerConnection.addEventListener('connectionstatechange', (event) => {
    console.log(peerConnection.connectionState);
    const fn = this['_on' + capitalizeFirstLetter(peerConnection.connectionState)];
    fn && fn(event);
  });

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

    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

    socket.emit('make-answer', {
      answer,
      to: data.socket,
    });
    getCalled = true;
  });
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
    socket.on('connection');
  }, []);
  const makeCall = useCallback(async (to) => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    socket.emit('call-user', { offer, to });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        //
        // Show My Video
        // videoGrid.style.display = 'grid';
        console.log('call video', localVideo);
        localVideo.current.srcObject = stream;
        localVideo.current.play();

        // Start a Peer Connection to Transmit Stream
        initConnection(stream);
      })
      .catch((error) => console.log(error));
  }, []);

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

    localVideo.current.srcObject = null;
  }

  return { makeCall, stopCall };
}
