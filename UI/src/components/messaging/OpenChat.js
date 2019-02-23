import React from "react";
import {
  AddIcon, IconButton, Message,
  MessageList, MessageText,
  Row as ChatRow, SendButton, TextComposer, TextInput
} from "@livechat/ui-kit";

const OpenChat = (props) => {


  const makeDateEllipsis = (date) => {
    const today = new Date();
    const hoursAndMinutes = `${date.getHours()}:${date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    if (today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()) return `Today, ${hoursAndMinutes}`;
    else return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${hoursAndMinutes}`;
  };


  if (!props.messaging.connected) return <div>
    Loading
  </div>;
  else {
    const activeChat = props.messaging.chats.filter(c => c.id === props.messaging.activeChatId)[0];
    return <div>
      {activeChat ? <MessageList active style={{ height: "580px" }}>
        {activeChat.messages.map(m => {
            return <Message date={makeDateEllipsis(new Date(m.createdAt))}
                            authorName={m._sender.nickname}
                            isOwn={m._sender.userId === props.user._id}>
              <MessageText>
                {m.message}
              </MessageText>
            </Message>;
          }
        )}
      </MessageList> : null}
      <TextComposer>
        <ChatRow align="center">
          <IconButton fit>
            <AddIcon/>
          </IconButton>
          <TextInput fill={"true"}/>
          <SendButton fit/>
        </ChatRow>
      </TextComposer>
    </div>;
  }
};

export default OpenChat;