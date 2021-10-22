import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import { CookieHandler } from '@src/utils/Cookies';
import Router from 'next/router';
import firebase from '@src/services/Firebase';

function resizePictureGoogle(picture) {
  const indexPicture = picture.indexOf('=');
  const realImage = picture.slice(0, indexPicture) + '=s1600';
  return realImage;
}

function LeftNavHeader(props) {
  const { classes } = props;
  const { firstName, lastName, picture } = JSON.parse(localStorage.getItem('currentUser'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  let resizedPic = null;
  if (picture !== undefined) {
    resizedPic = resizePictureGoogle(String(picture));
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    CookieHandler.removeCookie('access_token');
    firebase.auth().signOut();
    Router.push('/login');
  };

  const handleNavigateToProfilePage = () => {
    Router.push('/profile');
  };

  return (
    <CardHeader
      avatar={<Avatar aria-label='recipe' src={resizedPic}>{`${firstName.charAt(0)}${lastName.charAt(0)}`}</Avatar>}
      action={
        <div>
          <IconButton aria-label='More' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
            <MoreVertIcon className={classes.colorTextWhite} />
          </IconButton>
          <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleNavigateToProfilePage}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      }
      title={`${firstName} ${lastName}`}
      className={classes.colorTextWhite}
    />
  );
}

export default withStyles(styles)(LeftNavHeader);
