import React from "react";
import { Avatar, ChatList, ChatListItem, Column, Row as ChatRow, Subtitle, Title } from "@livechat/ui-kit";
import LoadingChatList from "./LoadingChatList";

const ListOfChats = (props) => {

  const makeDateEllipsis = (date) => {
    const today = new Date();
    if(today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()) return `${date.getHours()}:${date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    else return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };


  return <ChatList>
    {!props.messaging.connected ? <LoadingChatList/> :
      props.messaging.chats.map(chat =>
        <ChatListItem key={chat.id}
          active={chat.id === props.messaging.activeChatId} onClick={() => props.setActiveChatId(chat.id)}>
          <Avatar imgUrl={chat.coverUrl || null} letter={chat.coverUrl ? null : chat.name[0]}/>
          <Column fill={'true'}>
            <ChatRow justify>
              <Title ellipsis>{chat.name}</Title>
              <Subtitle nowrap>{chat.messages.length === 0 ? null : makeDateEllipsis(new Date(chat.messages[chat.messages.length-1].createdAt))}</Subtitle>
            </ChatRow>
            <Subtitle ellipsis>
              {`${chat.messages.length === 0 ? 'No messages yet' : chat.messages[chat.messages.length-1]._sender.nickname}${chat.messages.length === 0 ? '' : ': ' + chat.messages[chat.messages.length-1].message}`}
            </Subtitle>
          </Column>
        </ChatListItem>
      )}

  </ChatList>;
};

export default ListOfChats;