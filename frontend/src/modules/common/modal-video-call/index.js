import React, { useState, useRef } from 'react';
import { Box, ButtonBase } from '@material-ui/core';
import { useStyles } from './styles';
import { CallEnd } from '@material-ui/icons';

function VideoCallModal(props) {
  const classes = useStyles();
  const { localVideo, stopCall, setIsOpenCall, remoteVideo } = props;
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.remoteVideo}>
          <video className={classes.video} ref={remoteVideo}></video>
        </div>
        <div className={classes.localVideo}>
          <video className={classes.video} ref={localVideo}></video>
        </div>
        <ButtonBase
          onClick={() => {
            stopCall();
            setIsOpenCall(false);
          }}
        >
          <CallEnd style={{ width: '40', height: '40' }} />
        </ButtonBase>
      </div>
    </div>
  );
}

export default VideoCallModal;
