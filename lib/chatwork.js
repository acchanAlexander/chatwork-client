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

  getRoomMessages: () => {
    const options = {
      uri: 'https://api.chatwork.com/v1/rooms/' + chatwork.roomId + '/messages',
      headers: chatwork.headers,
      json: true
    };

    return new Promise((resolve, reject) => {
      request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  },

  postRoomMessages: () => {
    const options = {
      uri: 'https://api.chatwork.com/v1/rooms/' + chatwork.roomId + '/messages',
      form: {
        body: chatwork.msg
      },
      headers: chatwork.headers,
      json: true
    };

    return new Promise((resolve, reject) => {
      request.post(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }
}

module.exports = chatwork;
