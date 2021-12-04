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
