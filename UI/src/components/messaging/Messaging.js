import React, { Component } from "react";
import { ThemeProvider } from "@livechat/ui-kit";
import { Col, Row } from "react-bootstrap";
import SendBird from "sendbird";
import ListOfChats from "./ListOfChats";
import OpenChat from "./OpenChat";
import { connect } from "react-redux";
import { setActiveChat } from "../../actions/actionCreator";

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
    this.sendBird = new SendBird({ appId: "FCFCF24D-0ADD-4194-AC16-704752BF7D0B" });
    if (props.user.onboarded) {
      this.sendBird.connect(props.user._id, (user, error) => {
        if (user) props.toggleMessagingConnected();
        this.sendBird.updateCurrentUserInfo(props.user.firstName,
          props.user[props.user.type === "mentor" ? "mentorProfile" : "menteeProfile"].pictureUrl);

        if (props.user.type === "mentor") {
          if (props.user.mentorProfile.relationship.length > 0) {
            props.user.mentorProfile.relationship.forEach(r => {
              this.addChatMessagingLogic(r);
            });
          }
        } else {
          if (props.user.menteeProfile.relationship) {
            this.addChatMessagingLogic(props.user.menteeProfile.relationship);
          }
        }

        this.channelHandler = new this.sendBird.ChannelHandler();
        this.channelHandler.onMessageReceived = (channel, message) => {
          this.props.addMessagesToChat(channel.url, [message]);
        };
        this.sendBird.addChannelHandler(props.user._id, this.channelHandler);
      });
    }
  }

  componentWillUnmount() {
    if (this.props.user.onboarded) this.sendBird.disconnect(() => {
      this.props.toggleMessagingConnected();
      this.props.clearChats();
    });
  }

  addChatMessagingLogic(r) {
    this.sendBird.GroupChannel.getChannel(r.chatUrl, (channel, error) => {
      this.props.addMessagingChat({
        id: r.chatUrl,
        name: channel.name,
        coverUrl: channel.coverUrl,
        messages: []
      });
      this.props.setActiveChatId(r.chatUrl);

      const messagesQuery = channel.createPreviousMessageListQuery();
      messagesQuery.limit = 30;

      messagesQuery.load((messages, error) => {
        this.props.addMessagesToChat(r.chatUrl, messages);
      });

    });
  }

  sendMessageInChat = (chatUrl, msgToSend) => {
    this.sendBird.GroupChannel.getChannel(chatUrl, (channel, error) => {
      channel.sendUserMessage(msgToSend, null, null, (message, error) => {
        this.props.addMessagesToChat(chatUrl, [message]);
      });
    });
  };

  render() {
      const ListOfChatsComponent = connect(({ messaging }) => {
        return { messaging };
      }, dispatch => {
        return {
          setActiveChatId: (id) => dispatch(setActiveChat(id))
        };
      })(ListOfChats);

      const OpenChatComponent = connect(({ messaging, user }) => {
        return { messaging, user };
      }, dispatch => {
        return {
          sendMessageInChat: (chatUrl, message) => this.sendMessageInChat(chatUrl, message)
        };
      })(OpenChat);

      return (
        <ThemeProvider theme={this.theme}>
          <Row>
            <Col md={3}>
              <ListOfChatsComponent/>
            </Col>
            <Col md={9}>
              <OpenChatComponent/>
            </Col>
          </Row>
        </ThemeProvider>
      );
    }
}

export default Messaging;
