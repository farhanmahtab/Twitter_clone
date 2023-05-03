// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
// importScripts("https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
// firebase.initializeApp({
//   messagingSenderId: "40911931240",
// });
const firebaseConfig = {
  apiKey: "AIzaSyDqkMf8y4CYCpya93OuQPJyiSRKXdmAom0",
  authDomain: "twitter-clone-c26b8.firebaseapp.com",
  projectId: "twitter-clone-c26b8",
  storageBucket: "twitter-clone-c26b8.appspot.com",
  messagingSenderId: "774651560168",
  appId: "1:774651560168:web:db763f5679c7c4bfcb095d",
  measurementId: "G-W4LJ30BMT2",
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.onBackgroundMessage(function (payload) {
  // Customize notification here
  // const notificationTitle = "Background Message Title";
  // const notificationOptions = {
  //   body: "Background Message body.",
  //   click_action: "http://localhost:3000/message",
  // };

  // return self.registration.showNotification(
  //   notificationTitle,
  //   notificationOptions
  // );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
// [END background_handler]
