barebones setup for JavaScript / Node projects replace this with a one-liner phrase describing this project or app

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/17ba3aecd50d40fba969fc14bb2174a5)](https://app.codacy.com/gh/BuildForSDG/Team-203-TranSafe?utm_source=github.com&utm_medium=referral&utm_content=BuildForSDG/Team-203-TranSafe&utm_campaign=Badge_Grade_Settings)

## About Readme
Transafe is an app built with ionic+angular+firebase both in web and android that helps to mitigate road accidents in Ghana

The project is split into 3 parts:

1. The Front end web

2. Capacitor Android

3. The Firebase backend 



## Why
According to the article http://africanreality.over-blog.net/2019/11/road-accidents-the-case-of-ghana.causes-solutions-and-lessons-for-africa.html, the number one cause of death and injuries on the road is due to human error (80% of accidents) and the number one cause of death on the road is driver over speeding according to the article .Therefore a solution to check, alert and report overspeeding will go a long way in preventing and reducing road accident injuries and deaths on our roads.

The APP seeks to be checking and alerting user of over speeding in real time. Add over speeding record to the vehicle profile and rating on the app with details including date and time, location of over speeding, actual speed, actual speed limit, duration of over speeding. Make over speeding report to the law enforcement agency.

The APP seeks to address the problem statement 2 of Goal 3 of the SDG's.


## Usage
The APP need have to be installed on user's phone. Currently is a web app and the link is https://transafe-a15f3.web.app/. Opening the APP for the first time will take user through profile setup and phone verification. User can then click on the TRACK button just below lower right side of the ]

]speedometer, complete dialogue form and start tracking. The APP will require user to grant access to turn user's phone location on which is require for accurate monitoring of over speeding. The APP when installed will do among others the following
1. Monitor and notify user of over speeding during travel
2. Compute the percentage risk level of the user to road accidents based on the user's history of over speeding.
3. Show graphical trend of user's over speeding history
4. Discover other user's and vehicles's risk level due to over speeding.



## Setup
### Installing Node and NPM
This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (NPM is included) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

### Installing Ionic Cli
The Ionic Command Line Interface is required to serve and build the frontend. Instructions for installing the CLI can be found in the [Ionic Framework Docs](https://ionicframework.com/docs/installation/cli).

### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the root of this repository. After cloning, open your terminal and run:
```bash
npm install
```
 **npm i** is shorthand for **npm install**


### Initializing Firebase for ionic web app
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

## Authors

Below are the team members who contributed to the project
1. FullName: Christian Bosso  Github: penbosso  Role: Front-Ened Developer            Email:Chris-bchristiankelein@gmail.com  Phone:0248470214

2. FullName: Pius Gyamenah Linnaeus  Github:linhobs  Role: Back-End Developer
Email:Pius-gyamenahyawpius@gmail.com Phone:0546888899

3. FullName: Michael Hammond  Github: mickeymond Role: Back-End Developer Email:mickymond@gmail.com    Phone:0248470214

4. FullName: Diana Kerubo   Github: Deekerubo  Role: Mentor
Email:dianakerubo24@gmail.com

5. FullName: Ernestina Tawiah  Github: ErnestinaTawiah Role: Front-End Developer
Email:tawiah.ernestina.l@gmail.com
6. FullName: Anold Anyor  Github: Quame-Magma Role: Front-End Developer
Email: anoldanyor@gmail.

7. FullName: Ian Cecil Mawuli Akoto  Github: iancecilakoto@gmail.com Role:Full stack developer Email:iancecilakoto@gmail.com

8.  FullName: Fareed Mohammed  Github: Arshir Role:Technical Team Lead(TTL) Email:send2fareed@gmail.com

## Contributing
If this project sounds interesting to you and you'd like to contribute, thank you!
First, you can send a mail to buildforsdg@andela.com to indicate your interest, why you'd like to support and what forms of support you can bring to the table, but here are areas we think we'd need the most help in this project :
1.  area one (This APP is about avoiding,reducing,reporting,monitoring road accidents and injuriy on our roads and we will be extremely grateful if you share with us any useful feature not available in the APP that can be added to make the APP more suitable to achieving its purpose))
2.  area two (This APP can be made better and more aligned to its purpose through numerous testing and continuous testing. We will be grateful if you can volunteer to be one of the users who will like to test the APP in the staging phase.)
3.  area three (To join our end-of sprint webinar, and provide feedback as a stakeholder, kindly an email to the TTL (send2fareed@gmail.com) and the zoom link will be shared with you.)

## Acknowledgements

Did you use someone else’s code?
Do you want to thank someone explicitly?
Did someone’s blog post spark off a wonderful idea or give you a solution to nagging problem?

It's powerful to always give credit.

## LICENSE
MIT

