// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// const https = require('https');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.notifyUserOfOverSpeeding = functions.firestore
  .document('speeding/{timestamp}')
  .onWrite((change, context) => {
    console.log(change);
    // Extreact Client Data

    // Check If Client is Authenticated

    // Retrieve fcmToken for User from Database

    // Push Notification to User

    // Return Response
    return;
  });
