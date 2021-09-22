import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import BadgeAvatar from '@src/common/badge-avatar/BadgeAvatar';
import { UserService } from '@src/services/UserService';
import { styles } from './styles';

function ListContact(props) {
  const { classes } = props;
  const [listContactData, setListContactData] = useState([]);

  useEffect(() => {
    UserService.get_user_contact()
      .then((response) => {
        setListContactData(response?.msg.users);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div className='list-contact'>
      {listContactData?.map((data, index) => (
        <React.Fragment key={index}>
          <Card elevation={0} className={classes.cardStyle}>
            <CardHeader
              avatar={<BadgeAvatar isActive={parseInt(data.isOnline)} linkAvatar={data.image} />}
              title={`${data.firstName} ${data.lastName}`}
              className={classes.colorTextWhite}
              subheader={data.message}
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

export default withStyles(styles)(ListContact);
