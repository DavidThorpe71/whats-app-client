import React, { FC, useState, useMemo } from "react";
import moment from 'moment';
import styled from 'styled-components';
import { Comment, List, Tooltip, Avatar } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const Container = styled.div`
  height: calc(100% - 56px);
  overflow-y: overlay;
`;

const GET_CHATS_QUERY = gql`
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
  const {loading, error, data} = useQuery<chats: {name: string, picture: string}[]>(GET_CHATS_QUERY);

  if (loading) return <p>Loading</p>
  if (error) return <p>error</p>
  if (!data) return <p>no data</p>
  return (
  <Container>
    <List
      bordered
      dataSource={data.chats}
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
