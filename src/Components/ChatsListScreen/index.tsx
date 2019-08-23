import React, {FC} from 'react';
import ChatsNavBar from './ChatsNavBar';
import ChatsList from './ChatsList';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
`;


const ChatsListScreen: FC = () => (
  <Container>
    <ChatsNavBar />
    <ChatsList />
  </Container>
);

export default ChatsListScreen;