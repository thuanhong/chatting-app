import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Message from '@src/common/message/Message';
import ContactUser from '@src/common/contact-user/ContactUser';
import { GroupService } from '@src/services/GroupService';
import { useGlobalStore } from '@src/hooks/';
import { useObserver } from 'mobx-react-lite';
import { styles } from './styles';

let socket;

function Content(props) {
  const { classes } = props;
  const scrollRef = useRef(null);

  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState([]);
  const [currentGroup, setCurrentGroup] = useState('');

  const { groupChatStore } = useGlobalStore();
  const { id: groupId } = groupChatStore.currentGroupChatInfo;
  const { id } = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    socket = io('localhost:8000/chat');

    socket.on('chatToClient', (msg) => {
      setMessageList((prevstate) => {
        return [...prevstate, msg];
      });
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.emit('leaveRoom', currentGroup, () => {});
    socket.emit('joinRoom', groupId, () => {});
    setCurrentGroup(groupId);
    setMessageList([]);
  }, [groupId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [messageList]);

  const sendMessage = (event) => {
    event.preventDefault();
    // const payload = {
    //   lastMessage: message,
    // };
    // GroupService.update_group_info(groupChatStore.currentGroupChatInfo?.id, { payload: { lastMessage: message } });
    // groupChatStore.setCurrentGroupChatInfo(payload);

    if (message) {
      socket.emit('chatToServer', { sender: id, room: groupId, message });
      setMessage('');
    }
  };

  return useObserver(() => (
    <Box height={'100vh'} display='flex' alignItems='flex-start' justifyContent='flex-start'>
      <div className={classes.body}>
        <ContactUser />
        {messageList.map((msg, index) => (
          <Message key={index} message={msg.message} isSender={id === msg.sender} />
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
  ));
}

export default withStyles(styles)(Content);
