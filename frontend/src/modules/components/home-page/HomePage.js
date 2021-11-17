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
const callingVideo = createPeerConnectionContext();
function HomePage(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isOpenCall, setIsOpenCall] = React.useState(false);
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
    callingVideo.onCallMade(() => {
      setIsCalling(true);
    });
    callingVideo.onRemoveUser((socketId) => setConnectedUsers((users) => users.filter((user) => user !== socketId)));
    callingVideo.onUpdateUserList((users) => setConnectedUsers(users));
    callingVideo.onCallRejected((data) => alert(`User: "Socket: ${data.socket}" rejected your call.`));
    callingVideo.onAnswerMade((sockets) => callingVideo.callUser(sockets));
    callingVideo.onTrack((stream) => {
      remoteVideo.current.srcObject = stream;
    });

    callingVideo.onDisconnected(() => {
      // setStartTimer(false);
      remoteVideo.current.srcObject = null;
    });
  }, []);

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
            callingVideo={callingVideo}
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
              // isOpenCall={isOpenCall}
              setIsOpenCall={setIsOpenCall}
              isCalling={isCalling}
              setIsCalling={setIsCalling}
              callingVideo={callingVideo}
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
