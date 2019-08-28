import React from 'react';
import { FC } from 'react';
import { useQuery} from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_CHAT_QUERY = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name
      picture
      messages {
        id
        content
        createdAt
      }
    }
  }
`;

interface ChatRoomScreenParams {
  chatId: string;
}

interface ChatQueryMessage {
  id: string;
  content: string;
  createdAt: Date;
}

interface ChatQueryData {
  chat: {
    id: string;
    name: string;
    picture: string;
    messages: Array<ChatQueryMessage>;
  }
}

const ChatRoomScreen: FC<ChatRoomScreenParams> = ({chatId}) => {
  const {loading, error, data} = useQuery<ChatQueryData, ChatRoomScreenParams>(GET_CHAT_QUERY, {variables: {chatId}});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data || !data.chat) return <p>No data <span role="img" aria-label="unamused">😒</span></p>
  const {picture, name, messages} = data.chat;
  return (
    <div>
      <img src={picture} alt="Profile" />
      <div>{name}</div>
      <ul>
      {messages.map(message => (
        <li key={message.id}>
          <div>{message.content}</div>
          <div>{message.createdAt}</div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default ChatRoomScreen;