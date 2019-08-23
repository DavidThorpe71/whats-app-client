import React, { FC } from "react";
import "./App.css";
import 'antd/dist/antd.css';
import ChatsListScreen from "./Components/ChatsListScreen";

const App: FC = () => {
  return (
    <div>
      <ChatsListScreen />
    </div>
  );
};

export default App;
