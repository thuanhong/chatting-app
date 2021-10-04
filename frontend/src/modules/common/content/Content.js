import useInfiniteScroll from '@src/hooks/useInfiniteScroll';
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { useObserver, observer } from 'mobx-react-lite';
import { styles } from './styles';
import InfiniteScroll from 'react-infinite-scroll-component';

let socket;

const initPagination = {
  take: 15,
  pageIndex: 0,
};

function Content(props) {
  const { classes } = props;
  const scrollRef = useRef(null);

  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState([]);
  const [oldMessageList, setOldMessageList] = useState([]);
  const [currentGroup, setCurrentGroup] = useState('');
  const { groupChatStore } = useGlobalStore();
  const { id: groupId } = groupChatStore.currentGroupChatInfo;
  const { id } = JSON.parse(localStorage.getItem('currentUser'));
  const [pagination, setPagination] = useState(initPagination);

  const scrollRow = useRef(null);
  const scrollTop = useRef(null);

  useEffect(() => {
    socket = io('localhost:8000/chat');
    clearPagination();

    socket.on('chatToClient', (msg) => {
      setMessageList((prevstate) => {
        return [...prevstate, msg];
      });
    });

    return () => {
      // socket.emit('disconnect');
      socket.off();
    };
  }, []);
  function handleScroll(e) {
    const currentScrollY = e.target.scrollTop;

    if (scrollRow.current > currentScrollY) {
      setPagination({ take: pagination.take + 5, pageIndex: 0 });
    }
    scrollRow.current = currentScrollY - 40;
    return;
  }

  async function fetchListMessage() {
    const response = await ChatService.fetch_message_by_group_id(groupId, pagination);
    setOldMessageList(response.msg.data);
  }

  const clearPagination = () => {
    setOldMessageList([]);
    setMessageList([]);
    setPagination({ ...initPagination });
  };

  useEffect(() => {
    socket.emit('leaveRoom', currentGroup, () => {});
    setCurrentGroup(groupId);
    socket.emit('joinRoom', groupId, () => {});

    clearPagination();
    fetchListMessage();
    setTimeout(() => {
      return scrollRef.current.scrollIntoView({});
    }, 200);
  }, [groupId]);

  useEffect(() => {
    fetchListMessage();
  }, [pagination]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [messageList]);

  const sendMessage = (event) => {
    event.preventDefault();
    const payload = {
      lastMessage: message,
    };
    GroupService.update_group_info(groupChatStore.currentGroupChatInfo?.id, { payload: { lastMessage: message } });

    if (message) {
      socket.emit('chatToServer', { senderId: id, groupId: groupId, content: message });
      setMessage('');
    }
  };

  return useObserver(() => (
    <Box height={'100vh'} display='flex' alignItems='flex-start' justifyContent='flex-start'>
      <div id='scrollableDiv' className={classes.body} onScroll={handleScroll} ref={scrollTop}>
        {/* <li ref={scrollTop} /> */}

        <ContactUser />
        <InfiniteScroll
          dataLength={50}
          next={() => setPagination({ take: pagination.take + 5, pageIndex: 0 })}
          hasMore={true}
          inverse={true}
          style={{ display: 'flex', flexDirection: 'column-reverse', paddingTop: '10vh' }} //To put endMessage and loader to the top.
          scrollableTarget='scrollableDiv'
        >
          {oldMessageList
            .sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)))
            .map((msg, index) => {
              return <Message key={index} message={msg.content} isSender={id === msg.senderId} />;
            })}
        </InfiniteScroll>
        {messageList.map((msg, index) => {
          return <Message key={index} message={msg.content} isSender={id === msg.senderId} />;
        })}
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

export default withStyles(styles)(observer(Content));
