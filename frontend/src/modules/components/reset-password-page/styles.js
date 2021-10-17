import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginTop: theme.spacing(3),
    width: '50%',
  },
  bottomLinkContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  bottomLink: {
    marginTop: theme.spacing(4),
  },
  facebook: {
    backgroundColor: '#4267b2',
  },
  google: {
    backgroundColor: '#d93025',
  },
  languageSelection: {
    marginTop: theme.spacing(3),
  },
  linkButton: {
    width: '100%',
  },
  root: {
    height: '100vh',
  },
  image: {
    backgroundColor: 'black',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  rotated: {
    position: 'relative',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '30%',
    margin: 'auto',
    animation: '$rotated 40s infinite linear',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  '@keyframes rotated': {
    '0%': {
      transform: 'rotateZ(0)',
    },
    '100%': {
      transform: 'rotateZ(360deg)',
    },
  },
}));
