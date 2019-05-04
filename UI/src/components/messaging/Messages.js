import React from 'react';
import * as _ from 'lodash';
import Messaging from './Messaging';
import { connect } from 'react-redux';
import {
  addMessagesToChat,
  addMessagingChat, clearChats,
  setActiveChat,
  toggleMessagingConnected
} from '../../actions/actionCreator';

const Messages = (props) => {
  if (props.user.type === "mentor") {
    const rels = _.get(props.user, "mentorProfile.relationship");
    if (rels.length > 0 && _.some(rels, r => r.status === "confirmed")) return <Messaging {...props} />;
  }
  if (props.user.type === "mentee") {
    const rel = _.get(props.user, "menteeProfile.relationship.status");
    if (rel && rel.status === "confirmed") return <Messaging {...props} />;
  }
  return <div>Messaging is only available once your mentoring relationship has started</div>;
};

export default connect(({ user }) => {
  return { user };
}, dispatch => {
  return {
    toggleMessagingConnected: () => dispatch(toggleMessagingConnected()),
    addMessagingChat: (chat) => dispatch(addMessagingChat(chat)),
    addMessagesToChat: (chatId, messages) => dispatch(addMessagesToChat(chatId, messages)),
    setActiveChatId: (id) => dispatch(setActiveChat(id)),
    clearChats: (id) => dispatch(clearChats(id))
  };
})(Messages);