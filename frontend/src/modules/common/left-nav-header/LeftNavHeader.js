import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

function LeftNavHeader(props) {
  const { classes } = props;
  const { firstName, lastName } = JSON.parse(localStorage.getItem('currentUser'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CardHeader
      avatar={<Avatar aria-label='recipe'>{`${firstName.charAt(0)}${lastName.charAt(0)}`}</Avatar>}
      action={
        <div>
          <IconButton aria-label='More' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
            <MoreVertIcon className={classes.colorTextWhite} />
          </IconButton>
          <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      }
      title={`${firstName} ${lastName}`}
      className={classes.colorTextWhite}
    />
  );
}

export default withStyles(styles)(LeftNavHeader);
