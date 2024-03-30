# rocket3-js-sdk

## Requirements

node 18

## Installation

npm install

## SDK Function List



```javascript
//Update Auth Header
export const updateAuth = (accessToken) => {

}

//X logout
export const disconnectX = () => {

}

//Get tw login callback url
export const connectX = (callbackUrl = "") => {

}
//twitter login call_back
export const connectXCallback = (oauth_token, oauth_verifier) => {

}

//Get user info
export const getUserInfo = () => {

}

//Starting mission list
export const getNewbieTaskList = () => {

}
//Daily mission list
export const getDailyTaskList = () => {

}

// verify task
export const verifyTask = (activityId, taskInfoId) => {

}

//get tw comment and tweet
export const getTwitterComment = (tweetid) => {

}

//post tw comment
export const postTwitterComment = (activityId, taskInfoId, postText, replyId) => {

}

//get web3 wallet connect sign message
export const getSignMessage = (chainId, address) => {

}
//set invitation code on first login
export const setInvitationCode = (code) => {

}

//bind web3 wallet connect signature
export const bindSignature = (keyId, signature) => {

}

//discord callback
export const discordCallback = (code, state, error, callbackUrl = "") => {

}
//get social media bind url
export const socialMediaAuthorize = (type, callbackUrl = "") => {

}

// social media call back
export const socialMediaCallBack = (type, oauth_token, oauth_verifier, callbackUrl = "") => {

}

// Get sign for web3 wallet connect
export const getSign = (taskId) => {

}

// Remove social bind
export const removeBind = (type) => {

}

// Sign notice
export const signNotice = (taskId, hash) => {

}

// Query social media authorize info
export function socialMediaAuthorizeInfo() {

}
```

## Usage

```javascript
import { API } from "@peterwanghot/rocket3-js-sdk-test";
import { Constants } from "@peterwanghot/rocket3-js-sdk-test";

const getSign = API.getSign
```

## License

[LICENSE Link](https://github.com/rocket3labs/rocket3-js-sdk/blob/main/LICENSE)

This project is [MIT licensed](https://github.com/calibreapp/react-live-chat-loader/blob/main/LICENSE).
