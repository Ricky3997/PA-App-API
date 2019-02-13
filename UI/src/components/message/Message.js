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
  Row,
  SendButton,
  Subtitle,
  TextComposer,
  TextInput,
  ThemeProvider,
  Title
} from "@livechat/ui-kit";
import { Col, Row as BRow } from "react-bootstrap";

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
            chats: []
        };
        this.theme = {
            vars: {
                'primary-color': '#3A3A3A',
                'secondary-color': '#eb9d26',
                'tertiary-color': '#ffffff'
            },
            MessageText: {
                css: {
                    backgroundColor: "#d6d6d6",
                    borderRadius: "10px"
                }
            }
        };
    }

    //TODO https://docs.sendbird.com/javascript/quick_start

    componentDidMount() {
        const props = this.props;
        console.log(props.user);
        if(props.user) {
            const userProfile = props.user[props.user.type === "mentor" ? "mentorProfile" : "menteeProfile"];
            const name = "Riccardo";
            const avatar = "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w";;
            this.setState({active: 1, chats: [
                    {
                        id:1,
                        name: name,
                        avatar: avatar,
                        messages: [
                            {
                                id: 1,
                                from: name,
                                avatar: avatar,
                                date: "Today 12.46",
                                content: "I have seen your Personal Statement Draft"
                            },
                            {
                                id: 2,
                                from: name,
                                avatar: avatar,
                                date: "Today 14.31",
                                content: "Incredible work Riccardo, keep it up well done looking forward to seeing the next draft!"
                            },
                            {
                                id: 2,
                                from: "Me",
                                date: "Today 14.31",
                                content: "Thank you Emil! What shall we do next?"
                            },
                        ]
                    },
                    {
                        id:2,
                        name: "Alexander",
                        messages: [
                            {
                                id: 1,
                                from: "Me",
                                date: "Today 9.31",
                                content: "Hey Alex, I'm struggling with the journey module number 7"
                            },
                        ]
                    },
                    {
                        id:3,
                        name: "PA Italy Class of 2018",
                        avatar: "https://www.thesims3.com/sims3_asset/sims3_asset/thumb/shard000/000/035/351/93/original.jpg",
                        messages: [
                            {
                                id: 1,
                                from: "Me",
                                date: "Yesterday 11.24",
                                content: "Hello everyone, I'm Riccardo from Milan!"
                            },
                            {
                                id: 2,
                                from: "Nicolo",
                                avatar: "http://www.oas.org/en/ser/dia/perm_observers/Documents/Profiles/Flags/Italy.jpg",
                                date: "Yesterday 19.31",
                                content: "Hello to everyone! A reminder tonight we have Pizza con Mamma for Emil's sake"
                            },
                            {
                                id: 3,
                                from: "Giulio",
                                avatar: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7f23d84192024c49633e67/5a92ebcac830257a3473f7d4/1540544805094/Giulio+Corsi.jpg",
                                date: "Yesterday 29.54",
                                content: "Amazing, looking forward! 🍕"
                            },
                        ]

                    }
                ]})
        }
    }

    componentWillReceiveProps(props, nextContext) {
        console.log(props.user);
        if(props.user) {
            const userProfile = props.user[props.user.type === "mentor" ? "mentorProfile" : "menteeProfile"];
            const name = userProfile.firstName;
            const avatar = userProfile.pictureUrl;
            this.setState({active: 1, chats: [
                    {
                        id:1,
                        name: name,
                        avatar: avatar,
                        messages: [
                            {
                                id: 1,
                                from: name,
                                avatar: avatar,
                                date: "Today 12.46",
                                content: "I have seen your Personal Statement Draft"
                            },
                            {
                                id: 2,
                                from: name,
                                avatar: avatar,
                                date: "Today 14.31",
                                content: "Incredible work Riccardo, keep it up well done looking forward to seeing the next draft!"
                            },
                            {
                                id: 2,
                                from: "Me",
                                date: "Today 14.31",
                                content: "Thank you Emil! What shall we do next?"
                            },
                        ]
                    },
                    {
                        id:2,
                        name: "Alexander",
                        messages: [
                            {
                                id: 1,
                                from: "Me",
                                date: "Today 9.31",
                                content: "Hey Alex, I'm struggling with the journey module number 7"
                            },
                        ]
                    },
                    {
                        id:3,
                        name: "PA Italy Class of 2018",
                        avatar: "https://www.thesims3.com/sims3_asset/sims3_asset/thumb/shard000/000/035/351/93/original.jpg",
                        messages: [
                            {
                                id: 1,
                                from: "Me",
                                date: "Yesterday 11.24",
                                content: "Hello everyone, I'm Riccardo from Milan!"
                            },
                            {
                                id: 2,
                                from: "Nicolo",
                                avatar: "http://www.oas.org/en/ser/dia/perm_observers/Documents/Profiles/Flags/Italy.jpg",
                                date: "Yesterday 19.31",
                                content: "Hello to everyone! A reminder tonight we have Pizza con Mamma for Emil's sake"
                            },
                            {
                                id: 3,
                                from: "Giulio",
                                avatar: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7f23d84192024c49633e67/5a92ebcac830257a3473f7d4/1540544805094/Giulio+Corsi.jpg",
                                date: "Yesterday 29.54",
                                content: "Amazing, looking forward! 🍕"
                            },
                        ]

                    }
                ]})
        }
    }

    //Documentation: https://developers.livechatinc.com/docs/react-chat-ui-kit/

    render() {
        const messages = this.state.active ? this.state.chats.filter(chat => chat.id === this.state.active)[0].messages : null;
        console.log(messages)
        return (
            <ThemeProvider theme={this.theme}>
                <BRow>
                    <Col md={3}>
                        <ChatList>
                            {this.state.chats.map( chat => {
                                return <ChatListItem active={chat.id === this.state.active} onClick={() => this.setState({active: chat.id})}>
                                    <Avatar imgUrl={chat.avatar || null} letter={chat.avatar ? null : chat.name[0]} />
                                    <Column fill>
                                        <Row justify>
                                            <Title ellipsis>{chat.name}</Title>
                                            <Subtitle nowrap>{chat.messages[chat.messages.length - 1].date}</Subtitle>
                                        </Row>
                                        <Subtitle ellipsis>
                                            {`${chat.messages[chat.messages.length - 1].from} ${chat.messages[chat.messages.length - 1].content}`}
                                        </Subtitle>
                                    </Column>
                                </ChatListItem>
                            })}
                        </ChatList>
                    </Col>
                    <Col md={9}>
                        <MessageList active style={{height: "580px"}}>
                            {messages ? messages.map( message => {
                                return <MessageGroup avatar={message.from === "Me" ? null : message.avatar} onlyFirstWithMeta>
                                    <UIKitMessage date={message.date} authorName={message.from} isOwn={message.from === "Me"}>
                                        <MessageText>
                                            {message.content}
                                        </MessageText>
                                    </UIKitMessage>
                                </MessageGroup>
                            }) : null}
                        </MessageList>
                        <TextComposer>
                            <Row align="center">
                                <IconButton fit>
                                    <AddIcon/>
                                </IconButton>
                                <TextInput fill/>
                                <SendButton fit/>
                            </Row>
                        </TextComposer>
                    </Col>
                </BRow>
            </ThemeProvider>
        );
    }
};

export default Message;
