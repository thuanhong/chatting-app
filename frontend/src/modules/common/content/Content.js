import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import queryString from "query-string";
// import io from "socket.io-client";
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Message from '@src/common/message/Message';
import ChatData from '@src/mocks/chat-data';

const styles = (theme) => ({
  body: {
    height: '80vh',
    overflow: 'scroll',
    width: '100%',
    marginTop: '10vh',
    padding: '10px',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: 'transparent',
    width: 'calc(100% - 400px)',
    padding: theme.spacing(2),
  },
  inputUserData: {
    backgroundColor: 'gray',
    borderRadius: '30px',
    padding: '10px',
  },
});

function Content(props) {
  const { classes } = props;
  const [userName, setUserName] = useState('thuan');
  const [roomName, setRoomName] = useState('');

  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState([]);

  // const ENDPOINT = "http://localhost:5000/";

  useEffect(() => {
    // const { name, room } = queryString.parse(location.search);
    // socket = io(ENDPOINT);
    // setUserName(name);
    // setRoomName(room);
    // socket.emit("join", { name, room }, () => {});
    // return () => {
    //   socket.emit("disconnect");
    //   socket.off();
    // };
  }, []);

  useEffect(() => {
    // socket.on("message", (message) => {
    //   setMessageList([...messageList, message]);
    // });
  }, [messageList]);

  const sendMessage = (event) => {
    event.preventDefault();

    // if (message) {
    //   socket.emit("sendMessage", message, () => setMessage(""));
    // }
  };

  return (
    <Box height={'100vh'} display='flex' alignItems='flex-start' justifyContent='flex-start'>
      <div className={classes.body}>
        {ChatData.map((msg, index) => (
          <Message key={index} message={msg.text} isSender={userName === msg.user} />
        ))}
      </div>
      <AppBar component='div' position='fixed' className={classes.appBar}>
        <div>
          <InputBase
            placeholder='Type a message...'
            fullWidth
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            variant='outlined'
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage(e);
              }
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={sendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
            className={classes.inputUserData}
          />
        </div>
      </AppBar>
    </Box>
  );
}

export default withStyles(styles)(Content);
