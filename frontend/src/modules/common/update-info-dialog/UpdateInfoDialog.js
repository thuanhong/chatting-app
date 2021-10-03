import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { styles } from './styles';

function UpdateInfoDialog(props) {
  const { onClose, open, ...other } = props;
  const { firstName, lastName, email } = JSON.parse(localStorage.getItem('currentUser'));

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose();
  };

  return (
    <Dialog maxWidth='xs' aria-labelledby='confirmation-dialog-title' open={open} {...other}>
      <DialogTitle id='confirmation-dialog-title'>Phone Ringtone</DialogTitle>
      <DialogContent dividers>
        <TextField disabled label='First Name' defaultValue={firstName} variant='filled' />
        <TextField disabled label='Last Name' defaultValue={lastName} variant='filled' />
        <TextField disabled label='Email' defaultValue={email} variant='filled' />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleOk} color='primary'>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(UpdateInfoDialog);
