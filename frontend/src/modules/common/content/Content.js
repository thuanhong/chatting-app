import React, { useState, useEffect, useRef } from 'react';
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
import ContactUser from '@src/common/contact-user/ContactUser';
import ChatData from '@src/mocks/chat-data';
import { styles } from './styles';
import { GroupService } from '@src/services/GroupService';
import { useGlobalStore } from '@src/hooks/';

function Content(props) {
  const { classes } = props;
  const [userName, setUserName] = useState('thuan');
  const [roomName, setRoomName] = useState('');
  const scrollRef = useRef(null);

  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState([]);
  const { groupChatStore } = useGlobalStore();

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [ChatData]);

  const sendMessage = (event) => {
    event.preventDefault();
    const payload = {
      lastMessage: message,
    };
    const test = GroupService.update_group_info(groupChatStore.currentGroupChatInfo.id, { payload: { lastMessage: message } }).then((res) => console.log('TAI', res));
    console.log(test);
    // if (message) {
    //   socket.emit("sendMessage", message, () => setMessage(""));
    // }
  };

  return (
    <Box height={'100vh'} display='flex' alignItems='flex-start' justifyContent='flex-start'>
      <div className={classes.body}>
        <ContactUser />
        {[].map((msg, index) => (
          <Message key={index} message={msg.text} isSender={userName === msg.user} />
        ))}
        <li ref={scrollRef} />
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
