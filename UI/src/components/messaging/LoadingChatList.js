import React from 'react';
import { Avatar, ChatListItem, Column, Row as ChatRow, Subtitle, Title } from '@livechat/ui-kit';

const LoadingChatList = () => {
  return <ChatListItem active>
    <Avatar imgUrl={"https://cdn1.iconfinder.com/data/icons/loading-icon/100/loading_icon-01-512.png"}/>
    <Column fill={"true"}>
      <ChatRow justify>
        <Title ellipsis>...</Title>
      </ChatRow>
      <Subtitle ellipsis>
        Fetching conversations
      </Subtitle>
    </Column>
  </ChatListItem>;
};

export default LoadingChatList;