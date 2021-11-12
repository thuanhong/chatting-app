import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  main: {
    height: '100%',
    width: '100%',
    paddingLeft: '13px',
    paddingRight: '13px',
    // padding: '10px',
    zIndex: 1,
  },
  remoteVideo: {
    height: '100%',
    width: '45%',
    margin: 'auto',
  },
  localVideo: {
    height: '100%',
    zIndex: 4,
    width: '45%',
    margin: 'auto',
  },
  container: {
    display: 'flex',
    width: '100%',
    height: 'auto',
    paddingTop: '35px',
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: '5%',
    backgroundImage: 'url(https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-9.jpg)',
    backgroundSize: 'cover',
    zIndex: 5,
  },
}));
