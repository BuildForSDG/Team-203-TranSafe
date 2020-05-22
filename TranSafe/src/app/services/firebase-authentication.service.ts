import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {  Router } from '@angular/router';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(private auth0: AngularFireAuth, private route: Router) { }


  listenToSignIn() {
    return this.auth0.authState.subscribe(this.firebaseAuthSuccessListener);
  }


  async firebaseAuthSuccessListener(response) {
    // if needed, do a redirect in here
    if (response) {
      console.log('Logged in :)');
      (await Storage.set({ key: 'signedIn', value: 'userSignedIn' }));
    } else {
      console.log('Login Failed');
    }
  }



}
