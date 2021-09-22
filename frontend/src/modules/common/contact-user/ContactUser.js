import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useObserver } from 'mobx-react-lite';
import { useGlobalStore } from '@src/hooks';
import { styles } from './styles';

function ContactUser(props) {
  const { classes } = props;
  const { contactChatStore } = useGlobalStore();

  return useObserver(() => {
    const { email, firstName, lastName } = contactChatStore.currentUserChattingInfo;
    return (
      <div className='contanct-user'>
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
          <Button onClick={() => {}} variant='contained' color='primary'>
            Add Contact
          </Button>
        </Box>
      </div>
    );
  });
}

export default withStyles(styles)(ContactUser);
