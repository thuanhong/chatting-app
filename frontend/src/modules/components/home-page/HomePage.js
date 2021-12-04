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
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, IconButton, Typography } from '@material-ui/core';
import { Close, Call, CallEnd } from '@material-ui/icons';
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
const ConfirmDialog = ({ socket, isOpenCall, setIsOpenCall, data, setIsCalling }) => {
  return (
    <Dialog open={isOpenCall} maxWidth='sm' fullWidth>
      <DialogTitle>The call ring</DialogTitle>
      <Box position='absolute' top={0} right={0}>
        <IconButton
          onClick={() => {
            setIsOpenCall(false);
          }}
        >
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>User {data.userName || 'Aonoymous'} wants to call you. Do accept this call?</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          variant='contained'
          onClick={() => {
            setIsOpenCall(false);
            setIsCalling(true);
            setTimeout(() => {
              socket.emit('other-users', data.socketId);
            }, 2000);
          }}
          startIcon={<Call />}
        >
          Accept
        </Button>
        <Button
          color='secondary'
          variant='contained'
          onClick={() => {
            setIsOpenCall(false);
            socket.emit('reject-call', {
              from: data.socketId,
            });
          }}
          endIcon={<CallEnd />}
        >
          Deny
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const RejectedDialog = ({ data, isRejected, setIsRejected }) => {
  return (
    <Dialog open={isRejected} maxWidth='sm' fullWidth>
      <DialogTitle>The call ring</DialogTitle>
      <Box position='absolute' top={0} right={0}>
        <IconButton onClick={() => setIsRejected(false)}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>User {data.userName} was rejected the call</Typography>
      </DialogContent>
    </Dialog>
  );
};

const senders = [];
let socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/call`);
const callingVideo = createPeerConnectionContext(socket);

let localConnection;
let remoteConnection;

if (typeof window !== 'undefined') {
  // browser code
  localConnection = new window.RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });

  remoteConnection = new window.RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });
}
function HomePage(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isOpenCall, setIsOpenCall] = React.useState(false);
  const [isCalled, setIsCalled] = React.useState({});
  const [isRejected, setIsRejected] = React.useState(false);
  const [userRejected, setUserRejected] = React.useState({});

  const remoteVideo = useRef();
  const localVideo = useRef();
  const { groupChatStore, contactChatStore } = useGlobalStore();
  const { id: groupId, infoUser } = groupChatStore.currentGroupChatInfo;
  const { id, firstName, lastName } = JSON.parse(localStorage.getItem('currentUser'));
  const handleClose = () => {
    setIsCalled(false);
  };

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [isCalling, setIsCalling] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    callingVideo.joinRoom('call', id);
    callingVideo.onCallRejected((data) => {
      setIsRejected(true);
      setUserRejected(data);
    });

    socket.on('pick-up', async (data) => {
      setIsCalled(data);
      setIsOpenCall(true);
    });
  }, []);
  function makeCall(userId) {
    socket.emit('call', { userId });
  }

  return (
    <ThemeProvider theme={theme}>
      <ConfirmDialog socket={socket} isOpenCall={isOpenCall} setIsCalling={setIsCalling} setIsOpenCall={setIsOpenCall} data={isCalled} />
      <RejectedDialog data={userRejected} isRejected={isRejected} setIsRejected={setIsRejected} />
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
          {isCalling ? (
            <VideoCallModal
              senderId={infoUser}
              remoteVideo={remoteVideo}
              localVideo={localVideo}
              isCalled={isCalled}
              localConnection={localConnection}
              remoteConnection={remoteConnection}
              setIsCalled={setIsCalled}
              setIsOpenCall={setIsOpenCall}
              isCalling={isCalling}
              setIsCalling={setIsCalling}
              socket={socket}
            />
          ) : (
            <main className={classes.main}>
              <Header
                connectedUsers={connectedUsers}
                onDrawerToggle={handleDrawerToggle}
                makeCall={makeCall}
                isOpenCall={isOpenCall}
                setIsOpenCall={setIsOpenCall}
                setIsCalling={setIsCalling}
                isCalling={isCalling}
              />
              <Content connectedUsers={connectedUsers} setConnectedUsers={setConnectedUsers} callingVideo={callingVideo} isOpenCall={isOpenCall} setIsOpenCall={setIsOpenCall} />
            </main>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default withStyles(styles)(HomePage);
