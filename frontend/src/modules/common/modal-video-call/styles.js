import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  main: {
    height: '55vh',
    overflow: 'scroll',
    width: 'calc(100% - 400px)',

    marginTop: '15vh',
    padding: '10px',
    overflowX: 'hidden',

    position: 'absolute',
    zIndex: 1,
  },
  remoteVideo: {
    height: '40vh',
    marginLeft: 10,
    width: '95%',
  },
  localVideo: {
    height: '26vh',
    zIndex: 12,
    width: '23vh',
    position: 'absolute',
    right: 0,
    top: 27,
  },
  container: {
    display: 'relative',
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
    zIndex: 5,
  },
}));
