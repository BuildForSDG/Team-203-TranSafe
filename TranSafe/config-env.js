const { writeFile, mkdir } = require('fs');
require('dotenv').config();

const devFile = `./src/environments/environment.ts`;
const prodFile = `./src/environments/environment.prod.ts`;
const devConfig = `
  export const environment = {
    production: false,
    firebase: {
      apiKey: '${process.env.Transafe_api_key}',
      authDomain: '${process.env.Transafe_authdomain}',
      databaseURL: '${process.env.Transafe_database_url}',
      projectId: '${process.env.Transafe_project_id}',
      storageBucket: '${process.env.Transafe_storage_bucket}',
      messagingSenderId: '${process.env.Transafe_messaging_sender_id}',
      appId: '${process.env.Transafe_app_id}',
      measurementId: '${process.env.Transafe_measurement_id}'
    }
  };
`
const prodConfig = `
  export const environment = {
    production: true,
    firebase: {
      apiKey: '${process.env.Transafe_api_key}',
      authDomain: '${process.env.Transafe_authdomain}',
      databaseURL: '${process.env.Transafe_database_url}',
      projectId: '${process.env.Transafe_project_id}',
      storageBucket: '${process.env.Transafe_storage_bucket}',
      messagingSenderId: '${process.env.Transafe_messaging_sender_id}',
      appId: '${process.env.Transafe_app_id}',
      measurementId: '${process.env.Transafe_measurement_id}'
    }
  };
`

mkdir('./src/environments', { recursive: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    writeFile(devFile, devConfig, function (err) {
      if (err) {
        console.log(err);
      }
    });

    writeFile(prodFile, prodConfig, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
});
