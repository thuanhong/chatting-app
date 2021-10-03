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
import { ChatService } from '@src/services/ChatService';
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
      socket.emit('leaveRoom', currentGroup, () => {});
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.emit('leaveRoom', currentGroup, () => {});
    setCurrentGroup(groupId);
    socket.emit('joinRoom', groupId, () => {});
    setMessageList([]);
    ChatService.fetch_message_by_group_id(groupId)
      .then((response) => {
        setMessageList(response.msg.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [groupId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [messageList]);

  const sendMessage = (event) => {
    //keep this for testing until stateble
    // alert(`${groupChatStore.currentGroupChatInfo.id} ${groupChatStore.currentGroupChatInfo.lastMessage}`);
    event.preventDefault();
    const payload = {
      lastMessage: message,
    };
    GroupService.update_group_info(groupChatStore.currentGroupChatInfo?.id, { payload });

    if (message) {
      socket.emit('chatToServer', { senderId: id, groupId: groupId, content: message });
      setMessage('');
    }
  };

  return useObserver(() => (
    <Box height={'100vh'} display='flex' alignItems='flex-start' justifyContent='flex-start'>
      <div className={classes.body}>
        <ContactUser />

        {messageList.map((msg, index) => (
          <Message key={index} message={msg.content} isSender={id === msg.senderId} />
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
