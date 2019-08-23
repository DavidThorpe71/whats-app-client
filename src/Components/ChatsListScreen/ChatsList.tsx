import React, { FC } from "react";
import {chats} from '../../db';
import moment from 'moment';
import { List } from 'antd';
import { ListProps } from 'antd/lib/list/index'
import styled from 'styled-components';

const Container = styled.div`
  height: calc(100% - 56px);
  overflow-y: overlay;
`;
const StyledList = styled((props: ListProps<{
  id: string;
  name: string;
  picture: string;
  lastMessage: {
      id: string;
      content: string;
      createdAt: Date;
  } | undefined;
}>) => <List {...props} />)`
  padding: 0 !important;
`;
const StyledListItem = styled(props => <List.Item {...props}/>)`
  height: 76px;
  padding: 0 15px;
  display: flex;
`;
const ChatPicture = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;
const ChatInfo = styled.div`
  width: calc(100% - 60px);
  height: 46px;
  padding: 15px 0;
  margin-left: 10px;
  border-bottom: 0.5px solid silver;
  position: relative;
`;
const ChatName = styled.div`
  margin-top: 5px;
`;
const MessageContent = styled.div`
  color: gray;
  font-size: 15px;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const MessageDate = styled.div`
  position: absolute;
  color: gray;
  top: 20px;
  right: 0;
  font-size: 13px;
`;

const ChatsList: FC = () => (
  <Container>
    <StyledList
      bordered
      dataSource={chats}
      renderItem={item => (
        <StyledListItem button>
          <ChatPicture
          src={item.picture}
          alt="Profile"
          />
          <ChatInfo>

          <ChatName>{item.name}</ChatName>
          {item.lastMessage && (
            <>
              <MessageContent>{item.lastMessage.content}</MessageContent>
              <MessageDate>{moment(item.lastMessage.createdAt).format('HH:mm')}</MessageDate>
            </>
          )}
          </ChatInfo>
        </StyledListItem>
      )}
    />


  </Container>
);
export default ChatsList;
