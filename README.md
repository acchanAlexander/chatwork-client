# About
this module is aggregation "chatwork api".

you don't have to research chatwork api documentation.

you can separate chatwork-client entity from main code.

this module return Promise.

this module use chatwork api v2.  
about "chatwork api v2": http://support-en.chatwork.com/hc/en-us/articles/115000511946-01-26-2017-Chatwork-API-Update-Notice

# How to use

## Setup
install this module in your repository.

```npm install chatwork-client --save```

## Sample code
### post message.

```
'use strict'
const chatwork = require('chatwork-client');

// set parameters.
let chatworkParams = {
      chatworkToken: YOUR_TOKEN,
      roomId: ROOM_ID,
      msg: 'Hello, i using chatwork-client'
    };

// initialize.
chatwork.init(chatworkParams); 

// post massage.
// postRoomMessages return Promse Object.
chatwork.postRoomMessages()
  .then((data) => {
    doSomething(data);
  })
  .catch((err) => {
    console.log(err);
  });
```

### get my tasks.

```
let chatworkParams = {
      chatworkToken: YOUR_TOKEN,
      apiParams: {
        assigned_by_account_id: 123456,
        status: "done",
      }
    };

chatwork.init(chatworkParams);

chatwork.getMyTasks()
  .then((data)=>{
    doSomething(data);
  })
  .catch((err)=>{
    console.log(err);
  });
```

### monitoring message

```
setInterval(() => {
  chatwork.getRoomMessages()
    .then((data) => {
      doSomething(data);
    });
}, 5000);
```

#### caution
if you monitoring message.
you continue to request chatwork api.
be careful over request limit.

# APIs

## getMe()
#### require params
- chatworkToken: YOUR_TOKEN


## getMyStatus()
#### require params
- chatworkToken: YOUR_TOKEN


## getMyTasks()
#### require params
- chatworkToken: YOUR_TOKEN
#### optional params
- apiParams:
  - assigned_by_account_id: 123456
  - status: "{done | open}"


## getContacts()
#### require params
- chatworkToken: YOUR_TOKEN


## getRooms()
#### require params
- chatworkToken: YOUR_TOKEN


## getRoomMessages()
#### require params
- chatworkToken: YOUR_TOKEN
- roomId: ROOM_ID


## postRoomMessages()
#### require params
- chatworkToken: YOUR_TOKEN
- roomId: ROOM_ID
- msg: 'Hello, i using chatwork-client'
