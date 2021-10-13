import React, { useState } from 'react';
import { useStyles } from './styles.js';

const Message = (props) => {
  const { message, isSender, user, sender } = props;

  const classes = useStyles();

  return (
    <div>
      {isSender ? <div className={classes.msgUpperTextAdmin}> {user} </div> : <div className={classes.msgUpperTextLeft}>{sender} </div>}
      <div className={isSender ? classes.msgAdmin : classes.msgLeft}>
        <p className={isSender ? classes.msgContentAdmin : classes.msgContentLeft}>{message}</p>
      </div>
    </div>
  );
};

export default Message;
