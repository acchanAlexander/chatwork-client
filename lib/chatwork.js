'use strict'
const request = require('request');

const chatwork = {
  init: (initParams) => {
    chatwork.headers = {
      'X-ChatWorkToken': initParams.chatworkToken
    };
    chatwork.roomId = initParams.roomId;
    chatwork.msg = initParams.msg;

    if (initParams.hasOwnProperty('apiParams')) {
      chatwork.apiParams = initParams.apiParams;
    }
  },

  getMe: () => {
    const options = {
      uri: 'https://api.chatwork.com/v2/me',
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

  getMyStatus: () => {
    const options = {
      uri: 'https://api.chatwork.com/v2/my/status',
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

  getMyTasks: () => {
    let queryString = "";

    if (chatwork.hasOwnProperty('apiParams')) {
      queryString = getQueryString(chatwork.apiParams);
    }

    const options = {
      uri: 'https://api.chatwork.com/v2/my/tasks' + queryString,
      headers: chatwork.headers,
      json: true
    };

    return new Promise((resolve, reject) => {
      request.get(options, (error, response, body) => {
        if (!error) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  },

  getRoomMessages: () => {
    const options = {
      uri: 'https://api.chatwork.com/v2/rooms/' + chatwork.roomId + '/messages',
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
      uri: 'https://api.chatwork.com/v2/rooms/' + chatwork.roomId + '/messages',
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

function getQueryString(params) {
  let queryString = "";

  if (params.length < 1) {
    return queryString;
  }

  queryString = "?";

  for (let key in params) {
    queryString += key + "=" + params[key] + "&"
  }

  return queryString.slice(0, -1);
}

module.exports = chatwork;
