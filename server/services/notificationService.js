const admin = require('../config/firebase');

async function sendPushNotification(token, title, body) {
  try {
    const message = {
      notification: {
        title,
        body
      },
      token
    };

    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

module.exports = { sendPushNotification };