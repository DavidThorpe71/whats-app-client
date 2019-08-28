import React, { FC } from "react";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import ChatRoomScreen from './Components/ChatRoomScreen';
import ChatsListScreen from "./Components/ChatsListScreen";
import "./App.css";
import 'antd/dist/antd.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URL,
});

const App: FC = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/chats" component={ChatsListScreen} />
        <Route
          exact
          path="/chats/:chatId"
          component={({ match }: RouteComponentProps<{ chatId: string }>) => (
            <ChatRoomScreen chatId={match.params.chatId} />
            )}
            />
      </Switch>
      <Route exact path="/" render={redirectToChats} />
    </BrowserRouter>
  </ApolloProvider>
);

const redirectToChats = () => <Redirect to="/chats" />;

export default App;
