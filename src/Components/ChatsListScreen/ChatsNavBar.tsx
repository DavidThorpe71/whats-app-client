import React, { FC } from "react";
import { PageHeader } from 'antd';
import styled from 'styled-components';

const Container = styled(PageHeader)`
  background-color: var(--primary-bg);
  color: var(--primary-text);
  font-size: 20px;
  line-height: 40px;
`;

const ChatsNavBar: FC = () => <Container title="Whatsapp clone" />;

export default ChatsNavBar;
