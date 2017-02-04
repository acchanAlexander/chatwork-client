'use strict'
const request = require('request');

const chatwork = {
  init: (initParams) => {
    chatwork.headers = {
      'X-ChatWorkToken': initParams.chatworkToken
    };
    chatwork.roomId = initParams.roomId;
    chatwork.msg = initParams.msg;
  },

  getRoomMessages: (callback) => {
    const options = {
      uri: 'https://api.chatwork.com/v1/rooms/' + chatwork.roomId + '/messages',
      headers: chatwork.headers,
      json: true
    };

    request.get(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        if (callback !== undefined) {
          callback(body);
        }
      } else {
        console.log('error: '+ response.statusCode);
      }
    });
  },

  postRoomMessages: (callback) => {
    const options = {
      uri: 'https://api.chatwork.com/v1/rooms/' + chatwork.roomId + '/messages',
      form: {
        body: chatwork.msg
      },
      headers: chatwork.headers,
      json: true
    };

    request.post(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        if (callback !== undefined) {
          callback(body);
        }
      } else {
        console.log('error: '+ response.statusCode);
      }
    });
  }
}

module.exports = chatwork;
