import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from '@src/common/navigator/Navigator';
import Content from '@src/common/content/Content';
import Header from '@src/common/header/Header';
import { createPeerConnectionContext } from '@src/hooks/useVideoCall';
import VideoCallModal from '@src/modules/common/modal-video-call';
import { useGlobalStore } from '@src/hooks';
import io from 'socket.io-client';
import { SportsHockeyTwoTone } from '@material-ui/icons';
let theme = createTheme({
  palette: {
    primary: {
      main: '#009be5',
    },
    common: {
      white: '#c4cbd3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#2a2a2a',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 400;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  caller: {
    width: '100%',
    backgroundColor: 'black',
    // backgroundImage: 'url(https://jspizziri.com/images/test-screen.png)',
    backgroundPosistion: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  main: {
    flex: 1,
    background: 'black',
  },
};
const senders = [];
let socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/call`);
const callingVideo = createPeerConnectionContext(socket);
function HomePage(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isOpenCall, setIsOpenCall] = React.useState(false);
  const [isCalled, setIsCalled] = React.useState(null);

  const remoteVideo = useRef();
  const localVideo = useRef();
  const { groupChatStore, contactChatStore } = useGlobalStore();
  const { id: groupId, infoUser } = groupChatStore.currentGroupChatInfo;
  const { id, firstName, lastName } = JSON.parse(localStorage.getItem('currentUser'));

  // const {
  //   onCallMade,
  //   callUser,
  //   joinRoom,
  //   onUpdateUserList,
  //   onRemoveUser,
  //   onAnswerMade,
  //   onCallRejected,
  //   onTrack,

  //   // isAlreadyCalling,
  //   // getCalled,
  //   setGetCalled,
  //   peerConnection,
  // } = useVideoCall();
  // const callingVideo = Object.assign(
  //   {
  //     onCallMade,
  //     callUser,
  //     joinRoom,
  //     onUpdateUserList,
  //     onRemoveUser,
  //     onAnswerMade,
  //     onCallRejected,
  //     onTrack,
  //     //  isAlreadyCalling, getCalled,
  //     peerConnection,
  //   },
  //   callingVideo,
  // );
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [isCalling, setIsCalling] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    callingVideo.joinRoom('call', id);
    callingVideo.onCallRejected((data) => alert(`User: "User: ${data.userName}" rejected your call.`));

    socket.on('pick-up', async (data) => {
      const confirmed = confirm(`User "Socket: ${data.userName || data.socketId}" wants to call you. Do accept this call?`);
      console.log('beforeConfirm', confirmed);
      if (!confirmed) {
        console.log('inConfirm');

        socket.emit('reject-call', {
          from: data.socketId,
        });
        return;
      }
      setIsCalling(true);
      console.log('socketID', data.socketId);
      setTimeout(() => {
        socket.emit('other-users', data.socketId);
      }, 1500);
    });
  }, []);
  function makeCall(userId) {
    socket.emit('call', { userId });
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation='js'>
            <Navigator PaperProps={{ style: { width: drawerWidth } }} variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} />
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>

        <div className={classes.app}>
          <Header
            connectedUsers={connectedUsers}
            onDrawerToggle={handleDrawerToggle}
            makeCall={makeCall}
            isOpenCall={isOpenCall}
            setIsOpenCall={setIsOpenCall}
            setIsCalling={setIsCalling}
            isCalling={isCalling}
          />
          {isCalling ? (
            <VideoCallModal
              senderId={infoUser}
              remoteVideo={remoteVideo}
              localVideo={localVideo}
              isCalled={isCalled}
              setIsCalled={setIsCalled}
              // isOpenCall={isOpenCall}
              setIsOpenCall={setIsOpenCall}
              isCalling={isCalling}
              setIsCalling={setIsCalling}
              socket={socket}
              // callingVideo={callingVideo}
            />
          ) : (
            <main className={classes.main}>
              <Content connectedUsers={connectedUsers} setConnectedUsers={setConnectedUsers} callingVideo={callingVideo} isOpenCall={isOpenCall} setIsOpenCall={setIsOpenCall} />
            </main>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default withStyles(styles)(HomePage);
