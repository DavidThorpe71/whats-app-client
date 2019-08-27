import React, { FC, useState, useMemo } from "react";
import moment from 'moment';
import styled from 'styled-components';
import { Comment, List, Tooltip, Avatar } from 'antd';

const Container = styled.div`
  height: calc(100% - 56px);
  overflow-y: overlay;
`;

const getChatsQuery = `
  query GetChats {
    chats {
      id
      name
      picture
      lastMessage {
        id
        content
        createdAt
      }
    }
  }
`;

const ChatsList: FC = () => {
  const [chats, setChats] = useState<any[]>([]);
  useMemo(async () => {
    const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getChatsQuery }),
    });
    const {
      data: { chats },
    } = await body.json();
    setChats(chats);
  }, []);
  return (
  <Container>
    <List
      bordered
      dataSource={chats}
      renderItem={item => (
        <List.Item>
          <Comment
            data-testid="name"
            author={item.name}
            avatar={
              <Avatar
                data-testid="picture"
                src={item.picture}
                alt="Profile"
              />
            }
            content={item.lastMessage && item.lastMessage.content}
            datetime={
              <Tooltip title={moment(item.lastMessage && item.lastMessage.createdAt).format('HH:mm')}>
                <span data-testid="date">{moment(item.lastMessage && item.lastMessage.createdAt).fromNow()}</span>
              </Tooltip>
            }
          />
        </List.Item>
      )}
    />
  </Container>
)};
export default ChatsList;
