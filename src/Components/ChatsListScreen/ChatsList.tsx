import React, { FC } from "react";
import {chats} from '../../db';
import moment from 'moment';
import styled from 'styled-components';
import { Comment, List, Tooltip, Avatar } from 'antd';

const Container = styled.div`
  height: calc(100% - 56px);
  overflow-y: overlay;
`;


const ChatsList: FC = () => (
  <Container>
    <List
      bordered
      dataSource={chats}
      renderItem={item => (
        <List.Item>
          <Comment
            author={item.name}
            avatar={
              <Avatar
                src={item.picture}
                alt="Profile"
              />
            }
            content={item.lastMessage && item.lastMessage.content}
            datetime={
              <Tooltip title={moment(item.lastMessage && item.lastMessage.createdAt).format('HH:mm')}>
                <span>{moment(item.lastMessage && item.lastMessage.createdAt).fromNow()}</span>
              </Tooltip>
            }
          />
        </List.Item>
      )}
    />
  </Container>
);
export default ChatsList;
