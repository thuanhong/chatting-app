import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import BadgeAvatar from '@src/common/badge-avatar/BadgeAvatar';
import { GroupService } from '@src/services/GroupService';
import { styles } from './styles';

function ListGroupChat(props) {
  const { classes } = props;
  const [listGroupChatData, setListGroupChatData] = useState([]);

  useEffect(() => {
    GroupService.get_user_group_chat()
      .then((response) => {
        setListGroupChatData(response.msg.groups);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div className='list-group-chat'>
      {listGroupChatData.map((data, index) => (
        <React.Fragment key={index}>
          <Card elevation={0} className={classes.cardStyle}>
            <CardHeader
              avatar={<BadgeAvatar isActive={false} linkAvatar={data.image} />}
              title={data.groupName}
              className={classes.colorTextWhite}
              subheader={data.lastMessage}
              subheaderTypographyProps={{
                style: {
                  color: 'gray',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden !important',
                  textOverflow: 'ellipsis',
                  width: '250px',
                  overflowX: 'auto',
                },
              }}
              titleTypographyProps={{
                style: {
                  fontSize: '1.1rem',
                },
              }}
            />
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
}

export default withStyles(styles)(ListGroupChat);
