import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { styles } from './styles';

function LeftNavHeader(props) {
  const { classes } = props;
  const { firstName, lastName } = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <CardHeader
      avatar={<Avatar aria-label='recipe'>{`${firstName.charAt(0)}${lastName.charAt(0)}`}</Avatar>}
      action={
        <IconButton aria-label='More'>
          <MoreVertIcon className={classes.colorTextWhite} />
        </IconButton>
      }
      title={`${firstName} ${lastName}`}
      className={classes.colorTextWhite}
    />
  );
}

export default withStyles(styles)(LeftNavHeader);
