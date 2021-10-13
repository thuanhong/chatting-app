import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  msgUpperTextAdmin: {
    color: 'white',
    paddingRight: '5px',
    textAlign: 'right',
  },
  msgUpperTextLeft: {
    color: 'white',
    paddingLeft: '5px',
    textAlign: 'left',
  },
  msgLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  msgAdmin: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  msgContentAdmin: {
    backgroundColor: '#6D9886',
    width: '50%',
    padding: 15,
    margin: 0,
    marginBottom: 15,
    borderRadius: 20,
    color: 'white',
    fontWeight: 500,
  },
  msgContentLeft: {
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
