// import io from 'socket.io-client';
// import React, { useState, useCallback } from 'react';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// let peerConnection = null;
// if (typeof window !== 'undefined') {
//   // browser code
//   peerConnection = new window.RTCPeerConnection({
//     iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//   });
// }

class PeerConnectionSession {
  _onConnected;
  _onDisconnected;
  _room;
  isAlreadyCalling = false;
  getCalled = false;

  constructor(socket, peerConnection) {
    this.socket = socket;
    this.peerConnection = peerConnection;
    this.peerConnection.addEventListener('connectionstatechange', (event) => {
      console.log(this.peerConnection.connectionState);
      const fn = this['_on' + capitalizeFirstLetter(this.peerConnection.connectionState)];
      fn && fn(event);
    });
    // this.onCallMade();
  }
  joinRoom(rooms, userId) {
    this._room = rooms;
    this.socket.emit('joinRoom', { rooms, userId });
  }
  onCallMade(callback) {
    this.socket.on('call-made', async (data) => {
      // if (this.getCalled) {
      //   const confirmed = window.confirm(`User "Socket: ${data.socket}" wants to call you. Do accept this call?`);
      //   console.log('beforeConfirm', confirmed);
      //   if (!confirmed) {
      //     console.log('inConfirm');

      //     this.socket.emit('reject-call', {
      //       from: data.socket,
      //     });
      //     return;
      //   }
      //   callback();
      //   console.log('afterConfirm');
      // }
      // setTimeout(async () => {
      await this.peerConnection.setRemoteDescription(new window.RTCSessionDescription(data.offer));
      // await this.peerConnection.addIceCandidate(data.candidate);
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(new window.RTCSessionDescription(answer));
      console.log('offer', data.offer);
      console.log('answer', answer);
      this.socket.emit('make-answer', {
        answer,
        to: data.socket,
      });
      this.getCalled = true;
      // }, 2000);
    });
    // this.socket.on('stop-call', async (data) => {
    //   stopCall(data);
    // });
  }

  onRemoveUser(callback) {
    this.socket.on(`${this._room}-remove-user`, ({ socketId }) => {
      callback(socketId);
    });
  }

  onUpdateUserList(callback) {
    this.socket.on(`${this._room}-update-user-list`, ({ users }) => {
      callback(users);
    });
  }

  // Start a RTCPeerConnection to each client
  onAnswerMade(callback) {
    this.socket.on('answer-made', async (data) => {
      await this.peerConnection.setRemoteDescription(new window.RTCSessionDescription(data.answer));
      console.log('OUT CALL BACK');

      if (!this.isAlreadyCalling) {
        console.log('JOIN CALL BACK');
        this.isAlreadyCalling = true;
        await callback(data.userId);
        return;
      }
    });
  }
  onConnected(callback) {
    this._onConnected = callback;
  }

  onDisconnected(callback) {
    this._onDisconnected = callback;
  }

  onCallRejected(callback) {
    this.socket.on('call-rejected', (data) => {
      callback(data);
    });
  }

  onTrack(callback) {
    // setTimeout(
    // () =>
    // (
    this.peerConnection.ontrack = function({ streams: [stream] }) {
      callback(stream);
      // }),
      // 2000,
      // );
    };
  }
  async callUser(userId) {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(new window.RTCSessionDescription(offer));
    // const candidate = (this.peerConnection.onicecandidate = (event) => event.candidate);
    const candidate = this.peerConnection.onicecandidate;

    console.log('call back to another user', this.peerConnection.onicecandidate);
    this.socket.emit('call-user', { offer, userId, candidate });
  }
}

export const createPeerConnectionContext = (socket) => {
  if (typeof window !== 'undefined') {
    const peerConnection = new window.RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    console.log('Socket URL', `${process.env.NEXT_PUBLIC_BACKEND_URL}/call`);
    // const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/call`);

    return new PeerConnectionSession(socket, peerConnection);
  }
};
