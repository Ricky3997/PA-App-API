const config = require('../config');
const request = require('request-promise-native');

const createSendBirdChat = async (mentor, mentee) => {
  const body = {
    'name': `${mentor.firstName} and ${mentee.firstName}`,
    'user_ids': [mentor._id.toString(), mentee._id.toString()],
    'invitation_status[]': [`${mentor._id.toString()}:joined`, `${mentee._id.toString()}:joined`]
  };
  return request({
    method: 'post',
    body: body,
    json: true,
    url: 'https://api.sendbird.com/v3/group_channels',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': config.sendbird.API_TOKEN
    }
  });
};

const createSendBirdUser = async (id, user) => {

  //TODO Wait until in a relationship to start mentoring and create messaging account

  await request({
  method: 'post',
  body: {
    'user_id': id,
    'nickname': user.firstName,
    'profile_url': ''
  },
  json: true,
  url: 'https://api.sendbird.com/v3/users',
  headers: {
    'Content-Type': 'application/json',
    'Api-Token': config.sendbird.API_TOKEN
  }
});
}

module.exports = { createSendBirdChat };