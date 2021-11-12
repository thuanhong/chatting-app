import io from 'socket.io-client';

let room = null;
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/call`);
let peerConnection = null;
if (typeof window !== 'undefined') {
  // browser code
  peerConnection = new window.RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.services.mozilla.com' }, { urls: 'stun:stun.l.google.com:19302' }],
  });
}

export default function useVideoCall(localVideo, remoteVideo) {
  const senders = [];
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
        await callback();
        await createMediaStream();
      }
      await peerConnection.setRemoteDescription(new window.RTCSessionDescription(data.offer));
      await peerConnection.addIceCandidate(data.candidate);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(new window.RTCSessionDescription(answer));

      socket.emit('make-answer', {
        answer,
        to: data.socket,
      });
      getCalled = true;
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

      if (!isAlreadyCalling) {
        console.log('JOIN CALL BACK');
        await callback(data.userId);
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
    setTimeout(
      () =>
        (peerConnection.ontrack = function({ streams: [stream] }) {
          callback(stream);
        }),
      1000,
    );
  }

  async function callUser(userId) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new window.RTCSessionDescription(offer));
    const candidate = (peerConnection.onicecandidate = (event) => event.candidate);

    console.log('call back to another user', peerConnection.onicecandidate);
    socket.emit('call-user', { offer, userId, candidate });
  }

  const createMediaStream = async () => {
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
  };

  async function stopCall(to) {
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
    createMediaStream,
    isAlreadyCalling,
    getCalled,
  };
}
