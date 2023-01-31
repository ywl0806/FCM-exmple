import { initializeApp } from "firebase/app";
import {
  getToken,
  MessagePayload,
  Messaging,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const initFirebase = () => initializeApp(firebaseConfig);

export const requestForToken = (messaging: Messaging) => {
  return getToken(messaging, {
    vapidKey:
      "BJej2Bbpqr36hDd-QY0pzTBF7Sm2M5n9rdF4y_Qec4r2YSu1BGHkOwPpPti225nZSJQUYCkP0vIxfcWvoaY4WEA",
  });
};

export const onMessageListener = (messaging: Messaging) =>
  new Promise<MessagePayload>((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
