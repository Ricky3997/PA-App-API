import React from 'react';
import {
    Avatar,
    ChatList,
    ChatListItem,
    Column,
    Row,
    Subtitle,
    ThemeProvider,
    Title,
    MessageList,
    MessageGroup,
    Message as UIKitMessage,
    MessageText,
    TextComposer, IconButton, AddIcon, TextInput, SendButton
} from '@livechat/ui-kit'
import {Col, Row as BRow} from "react-bootstrap";

const Message = (props) => {
    const theme = {
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
    return (
        <ThemeProvider theme={theme}>

            <BRow>
                <Col md={3}>
                    <ChatList>
                        <ChatListItem>
                            <Avatar imgUrl={props.mentor.pictureUrl}/>
                            <Column fill>
                                <Row justify>
                                    <Title ellipsis>{props.mentor.firstName}</Title>
                                    <Subtitle nowrap>{'14:31 PM'}</Subtitle>
                                </Row>
                                <Subtitle ellipsis>
                                    {"Emil: Great, I suggest we do an introductory call to start with, when would you\n" +
                                    " be available?"}
                                </Subtitle>
                            </Column>
                        </ChatListItem>
                        <ChatListItem active>
                            <Avatar letter="A"/>
                            <Column fill>
                                <Row justify>
                                    <Title ellipsis>{'Alexander'}</Title>
                                    <Subtitle nowrap>{'10:53 PM'}</Subtitle>
                                </Row>
                                <Subtitle
                                    ellipsis>{'You: Hey Alex, I\'m struggling with the journey module number 7'}</Subtitle>
                            </Column>
                        </ChatListItem>
                        <ChatListItem>
                            <Avatar imgUrl="https://images.alphacoders.com/755/thumb-1920-75533.jpg"/>
                            <Column fill>
                                <Row justify>
                                    <Title ellipsis>PA Italy Class of 2018 </Title>
                                    <Subtitle nowrap>{'14:31 PM'}</Subtitle>
                                </Row>
                                <Subtitle ellipsis>
                                    {"Nicolo: Hello to everyone! A reminder tonight we have the Pizza"}
                                </Subtitle>
                            </Column>
                        </ChatListItem>
                    </ChatList>
                </Col>
                <Col md={9}>
                    <MessageList active>
                        <MessageGroup avatar={props.mentor.pictureUrl} onlyFirstWithMeta>
                            <UIKitMessage date="20:35" authorName={props.mentor.firstName}>
                                <MessageText>Hey Riccardo, I'm Emil and I'll be your mentor from now on!</MessageText>
                            </UIKitMessage>
                            <UIKitMessage date="20:36" authorName={props.mentor.firstName}>
                                <MessageText>I wanted to get in touch and introduce myself, nice to meet
                                    you!!</MessageText>
                            </UIKitMessage>
                            <UIKitMessage date="20:38" authorName={props.mentor.firstName}>
                                <MessageText>Very happy to help you out 😃</MessageText>
                            </UIKitMessage>
                        </MessageGroup>
                        <MessageGroup onlyFirstWithMeta>
                            <UIKitMessage date="21:38" isOwn={true} authorName="Me">
                                <MessageText>
                                    Thanks for your message Emil!
                                </MessageText>
                            </UIKitMessage>
                        </MessageGroup>
                        <MessageGroup onlyFirstWithMeta>
                            <UIKitMessage date="21:41" isOwn={true} authorName="Me">
                                <MessageText>Fantastic to meet you, and super excited for your advice! </MessageText>
                            </UIKitMessage>
                        </MessageGroup>
                        <MessageGroup avatar={props.mentor.pictureUrl} onlyFirstWithMeta>
                            <UIKitMessage authorName={props.mentor.firstName} date="21:47">
                                <MessageText>Great, I suggest we do an introductory call to start with, when would you
                                    be available?</MessageText>
                            </UIKitMessage>
                        </MessageGroup>
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
};

export default Message;
