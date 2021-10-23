import React, { useState, useRef } from 'react';
import { Box, ButtonBase } from '@material-ui/core';
import { useStyles } from './styles';
import { CallEnd } from '@material-ui/icons';

function VideoCallModal(props) {
  const classes = useStyles();
  const { localVideo, stopCall, setIsOpenCall, remoteVideo, isOpenCall, senderId } = props;
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.remoteVideo}>
          <video className={classes.video} ref={remoteVideo} autoPlay></video>
        </div>
        <div className={classes.localVideo}>
          <video className={classes.video} ref={localVideo} autoPlay muted></video>
        </div>
        {isOpenCall && (
          <ButtonBase
            onClick={() => {
              console.log('senderId', senderId);
              stopCall(senderId.userGroups_user_id);
              setIsOpenCall(false);
            }}
          >
            <CallEnd style={{ width: '40', height: '40', color: 'red' }} />
          </ButtonBase>
        )}
      </div>
    </div>
  );
}

export default VideoCallModal;
