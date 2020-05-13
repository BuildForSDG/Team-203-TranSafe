# TRANSAFE

Transafe is an app built with ionic+angular+firebase both in web and android that helps to mitigate road accidents in Ghana

The project is split into 3 parts:

1. The Front end web

2. Capacitor Android

3. The Firebase backend

## Getting Setup

### Installing Node and NPM
This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (NPM is included) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

### Installing Ionic Cli
The Ionic Command Line Interface is required to serve and build the frontend. Instructions for installing the CLI can be found in the [Ionic Framework Docs](https://ionicframework.com/docs/installation/cli).

### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the root of this repository. After cloning, open your terminal and run:
```bash
npm install
```
>_tip_: **npm i** is shorthand for **npm install**


### Initializing Firebase
Copy the firebase credentials from the firebase platform and past the values in the environment.ts files.
You can store each secret keys in the environment variable in windows or a use a profile in macos and then reference it in the envirnoment.ts file in the project. You can check it out here ['How to Set Environment Variables in windows 10'](https://www.onmsft.com/how-to/how-to-set-an-environment-variable-in-windows-10)

Sometimes you may need to restart your pc before the changes to the environment variable take effect
Be sure not to commit the secret keys to github!!!!!!
```bash

// if in your environment variable you set apiKey reference to be API_KEY, then the reference would be process.env.API_KEY

export const environment = {
  production: false,
  firebase: {
     apiKey: process.env.Transafe_api_key,
    authDomain: process.env.Transafe_authdomain,
    databaseURL: process.env.Transafe_database_url,
    projectId: process.env.Transafe_project_id,
    storageBucket: process.env.Transafe_storage_bucket,
    messagingSenderId: process.env.Transafe_messaging_sender_id,
    appId: process.env.Transafe_app_id,
    measurementId: process.env.Transafe_measurement_id
  }

}

```


### Installing android studio
Android studio ide helps to preview codes, debug and build capacitor android app
Instructions for installing Android studio latest version can be found in the [Android studio download](https://developer.android.com/studio).


### Configuring capacitor for project
Capacitor is a cross-platform app runtime that makes it easy to build web apps that run natively on iOS, Android, and the web. We call these apps "Native Progressive Web Apps" and they represent the next evolution beyond Hybrid apps
Documentation on capacitor can be found at [Capacitor Documentation](https://capacitor.ionicframework.com/docs/)
 and [Ionic android and ios configuration for capacitor](https://ionicframework.com/docs/developing/android)

### Initialize Capacitor for project
open your terminal and run:
```bash
cd TranSafe
ionic integrations enable capacitor
```

### Build ionic app for capacitor android
Before You can open android studio with capacitor, you need to build the ionic project at least once.
You must build your Ionic project at least once before adding any native platforms
open your terminal and run:
```bash
ionic build
```

### Open ANDROID STUDIO IDE to build,run, and deploy 
The native  Android project is opened in the standard IDE (Android Studio). Use the IDEs to run and deploy your app.
open your terminal and run:
```bash
cd TranSafe
npx cap open android
```

### Syncing your app with capacitor
Every time you perform a build (e.g. ionic build) that changes your web directory (default: www), you'll need to copy those changes down to your native project(android):
open your terminal and run:
```bash
cd TranSafe
npx cap copy
```

### running web app
open your terminal and run:
```bash
cd TranSafe
ionic serve
```
