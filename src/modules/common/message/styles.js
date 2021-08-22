import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  msgLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  msgAdmin: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  msgContent: {
    backgroundColor: '#3e4042',
    width: '50%',
    padding: 15,
    margin: 0,
    marginBottom: 15,
    borderRadius: 20,
    color: 'white',
    fontWeight: 500,
  },
}));
