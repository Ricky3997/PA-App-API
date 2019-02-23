import React, { Component } from "react";
import {
  AddIcon,
  Avatar,
  ChatList,
  ChatListItem,
  Column,
  IconButton,
  Message as UIKitMessage,
  MessageGroup,
  MessageList,
  MessageText,
  Row as ChatRow,
  SendButton,
  Subtitle,
  TextComposer,
  TextInput,
  ThemeProvider,
  Title
} from "@livechat/ui-kit";
import { Col, Row } from "react-bootstrap";
import SendBird from "sendbird";
import LoadingChatList from "./LoadingChatList";

class Messaging extends Component {
  constructor(props) {
    super(props);
    this.theme = {
      vars: {
        "primary-color": "#3A3A3A",
        "secondary-color": "#eb9d26",
        "tertiary-color": "#ffffff"
      },
      ChatList: {
        css: { // css object with any CSS properties
          borderColor: "blue",
          borderSize: "5px"
        }
      },
      MessageText: {
        css: {
          backgroundColor: "#d6d6d6",
          borderRadius: "10px"
        }
      }
    };
    this.sb = new SendBird({ appId: "FCFCF24D-0ADD-4194-AC16-704752BF7D0B" });
    this.sb.connect(props.user._id, (user, error) => { //TODO Add authenticating token
      if (user) props.toggleMessagingConnected();
      this.sb.updateCurrentUserInfo(props.user.firstName,
        props.user[props.user.type === "mentor" ? "mentorProfile" : "menteeProfile"].pictureUrl);

      if (props.user.type === "mentor") {
        if (props.user.mentorProfile.relationship.length > 0) {
          props.user.mentorProfile.relationship.forEach(r => {
            console.log(r.chatUrl);
            this.sb.GroupChannel.getChannel(r.chatUrl, (channel, error) => {
              console.log(channel);
            });
          });
        }
      } else {
        if (props.user.mentorProfile.relationship) {
          alert("Will need to sign in");
        }
      }
    });
  }

  componentWillUnmount() {
    this.sb.disconnect(() => {
      this.props.toggleMessagingConnected();
    });
  }

  //TODO https://docs.sendbird.com/javascript/quick_start

  //Documentation: https://developers.livechatinc.com/docs/react-chat-ui-kit/

  render() {
    const messages = [], chats = [], activeId = 12345;
    return (
      <ThemeProvider theme={this.theme}>
        <Row>
          <Col md={3}>
            <ChatList>


              {!this.props.messaging.connected ? <LoadingChatList/> :
                chats.map(chat => <ChatListItem active={chat.id === activeId}
                                                onClick={() => this.setState({ active: chat.id })}>
                    <Avatar imgUrl={chat.avatar || null} letter={chat.avatar ? null : chat.name[0]}/>
                    <Column fill>
                      <ChatRow justify>
                        <Title ellipsis>{chat.name}</Title>
                        <Subtitle nowrap>{chat.messages[chat.messages.length - 1].date}</Subtitle>
                      </ChatRow>
                      <Subtitle ellipsis>
                        {`${chat.messages[chat.messages.length - 1].from} ${chat.messages[chat.messages.length - 1].content}`}
                      </Subtitle>
                    </Column>
                  </ChatListItem>
                )}

            </ChatList>
          </Col>

          <Col md={9}>
            <MessageList active style={{ height: "580px" }}>
              {messages ? messages.map(message => {
                return <MessageGroup avatar={message.from === "Me" ? null : message.avatar} onlyFirstWithMeta>
                  <UIKitMessage date={message.date} authorName={message.from} isOwn={message.from === "Me"}>
                    <MessageText>
                      {message.content}
                    </MessageText>
                  </UIKitMessage>
                </MessageGroup>;
              }) : null}
            </MessageList>
            <TextComposer>
              <ChatRow align="center">
                <IconButton fit>
                  <AddIcon/>
                </IconButton>
                <TextInput fill={"true"}/>
                <SendButton fit/>
              </ChatRow>
            </TextComposer>
          </Col>
        </Row>
      </ThemeProvider>
    );
  }
};

export default Messaging;
