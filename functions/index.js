// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Function to Compute and Store User OverSpeeding
exports.computeAndStoreOverSpeeding = functions.https.onCall((data, context) => {
  // Extreact Client Data

  // Check If Client is Authenticated

  // Compute Over Speeding

  // Store Results

  // Return Response
  return { message: 'Operation Completed Successfully' };
});

exports.notifyUserOfOverSpeending = functions.https.onCall((data, context) => {
  // Extreact Client Data

  // Check If Client is Authenticated

  // Retrieve fcmToken for User from Database

  // Push Notification to User

  // Return Response
  return { message: 'Operation Completed Successfully' };
});
