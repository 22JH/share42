// importScripts("https://www.gstatic.com/firebasejs/5.4.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/5.4.1/firebase-messaging.js");
// firebase.initializeApp({
//   messagingSenderId: "902867957",
// });
// const messaging = firebase.messaging();
self.addEventListener("install", function (e) {
  console.log("fcm install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm activate..");
});
self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image, // 웹 푸시 이미지는 icon
    tag: resultData.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
