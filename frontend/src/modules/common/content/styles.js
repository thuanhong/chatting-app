export const styles = (theme) => ({
  body: {
    height: '80vh',
    overflow: 'scroll',
    width: '100%',
    marginTop: '10vh',
    padding: '10px',
    overflowX: 'hidden',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: 'transparent',
    width: 'calc(100% - 400px)',
    padding: theme.spacing(2),
  },
  inputUserData: {
    backgroundColor: 'gray',
    borderRadius: '10px',
    padding: '7px',
  },
  uploadBtn: {
    color: '#6D9886',
  },
  inputChat: {
    display: 'flex',
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
});
