import React, { useState } from 'react';
import { useStyles } from './styles.js';

const Message = (props) => {
  const { message, isSender } = props;

  const classes = useStyles();

  return (
    <div className={isSender ? classes.msgAdmin : classes.msgLeft}>
      <p className={isSender ? classes.msgContentAdmin : classes.msgContentLeft}>{message}</p>
    </div>
  );
};

export default Message;
