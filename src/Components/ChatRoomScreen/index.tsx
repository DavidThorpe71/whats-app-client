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
const ChatRoomScreen: FC<ChatRoomScreenParams> = ({chatId}) => {
    const {loading, error, data} = useQuery(GET_CHAT_QUERY, {variables: {chatId}});

    if (loading) return <p>Loading...</p>;
     if (error) return <p>Error :(</p>;
    return (
        <div>
            <p>{JSON.stringify(data)}</p>
        </div>
    )
}

export default ChatRoomScreen;