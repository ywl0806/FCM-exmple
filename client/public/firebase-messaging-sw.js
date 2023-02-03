/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js"
);

const config = {
  apiKey: "AIzaSyCbd01UcKX0qFqN4y5VxQkiLSiyrfJUndM",
  authDomain: "fcm-example-170f0.firebaseapp.com",
  projectId: "fcm-example-170f0",
  storageBucket: "fcm-example-170f0.appspot.com",
  messagingSenderId: "192825940650",
  appId: "1:192825940650:web:6f0c73d1bca621e08fced3",
};

firebase.initializeApp(config);
let messages = [];

const braodcast = new BroadcastChannel("ch-notice");

braodcast.onmessage = (event) => {
  if (event.data.type === "getMessages") {
    braodcast.postMessage(messages);
    messages = [];
  }
};
const isSupported = firebase.messaging.isSupported();
if (isSupported) {
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage((payload) => {
    // Customize notification here
    // const notificationTitle = payload.data.title;
    // const notificationOptions = {
    //   data: payload.data,
    //   body: payload.data.body,
    //   icon: "/doge.jpg",
    // };
    // self.registration.showNotification(notificationTitle, notificationOptions);
    console.log(payload);
    messages.push({ ...payload.data, id: payload.messageId });
    if (messages.length > 10) {
      messages.shift();
    }
  });

  // self.addEventListener("notificationclick", (e) => {
  //   e.notification.close();
  //   e.waitUntil(
  //     clients
  //       .matchAll({ includeUncontrolled: true, type: "window" })
  //       .then((clientList) => {
  //         for (let i = 0; i < clientList.length; i++) {
  //           const client = clientList[i];

  //           if ("focus" in client) return client.focus();
  //         }

  //         if (clients.openWindow) {
  //           return clients.openWindow("/");
  //         }
  //       })
  //   );
  // });
}
