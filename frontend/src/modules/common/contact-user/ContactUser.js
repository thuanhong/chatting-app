import React from 'react';
import { toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useObserver } from 'mobx-react-lite';
import { useGlobalStore } from '@src/hooks';
import { UserService } from '@src/services/UserService';
import { styles } from './styles';

function ContactUser(props) {
  const { classes } = props;
  const { contactChatStore } = useGlobalStore();

  const addUserContact = async (firstName, lastName, contactId) => {
    const payload = {
      firstName,
      lastName,
      contactId,
    };
    try {
      await UserService.add_user_contact(payload);
      toast.success('Add new contact successful', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error(err, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return useObserver(() => {
    const { id, email, firstName, lastName, isContacted } = contactChatStore.currentUserChattingInfo;
    return (
      <div className='contanct-user' style={{ zIndex: '10' }}>
        {firstName && !isContacted && (
          <>
            <Box display='flex' justifyContent='center' m={1} p={1}>
              <Box p={1}>
                <Avatar alt='User Avatar' src={''} className={classes.large} />
              </Box>
              <Box p={1} className={classes.userTitleStyle}>
                <p>{`${firstName} ${lastName}`}</p>
                <p>{email}</p>
              </Box>
            </Box>
            <Box display='flex' justifyContent='center' m={1} p={1}>
              <Button onClick={() => addUserContact(firstName, lastName, id)} variant='contained' color='primary'>
                Add Contact
              </Button>
            </Box>
          </>
        )}
      </div>
    );
  });
}

export default withStyles(styles)(ContactUser);
