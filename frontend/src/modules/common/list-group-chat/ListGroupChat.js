import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import BadgeAvatar from '@src/common/badge-avatar/BadgeAvatar';
import { GroupService } from '@src/services/GroupService';
import { useObserver } from 'mobx-react-lite';

import { styles } from './styles';
import { Button } from '@material-ui/core';
import { useGlobalStore } from '@src/hooks';
import { ButtonBase } from '@material-ui/core';
const initPagination = {
  take: 5,
  pageIndex: 0,
};

function ListGroupChat(props) {
  const { classes } = props;
  const [listGroupChatData, setListGroupChatData] = useState([]);
  const [pagination, setPagenation] = useState(initPagination);
  const { groupChatStore } = useGlobalStore();

  const getGroupData = () => {
    GroupService.get_user_group_chat(pagination)
      .then((response) => {
        setListGroupChatData((presState) => [...presState, ...(response.msg.groups ?? [])]);
        setPagenation({ ...pagination, pageIndex: pagination.pageIndex + 1 });
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getGroupData();
    groupChatStore.setCurrentGroupChatInfo(listGroupChatData[0]);
    // #TODO
    // set Navigat bar Group Name defaulth
    //groupChatStore.setCurrentGroupChatInfo({ groupName: listGroupChatData[0]?.groupName ?? null });
  }, []);
  return useObserver(() => {
    return (
      <div className='list-group-chat'>
        {listGroupChatData.map((data, index) => (
          <React.Fragment key={index}>
            <ButtonBase
              onClick={() => {
                return groupChatStore.setCurrentGroupChatInfo({ ...data });
              }}
            >
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
            </ButtonBase>
          </React.Fragment>
        ))}
        <Button style={{ width: '100%', backgroundColor: 'transparent' }} onClick={getGroupData}>
          {' '}
          See more
        </Button>
      </div>
    );
  });
}

export default withStyles(styles)(ListGroupChat);
