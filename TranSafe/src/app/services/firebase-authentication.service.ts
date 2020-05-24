import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {  Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { User } from '../signup/signup.page';

const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(private auth0: AngularFireAuth,  private router: Router,  private afs: AngularFirestore) { }


  listenToSignIn() {
    return this.auth0.authState.subscribe(this.firebaseAuthSuccessListener);
  }


  async firebaseAuthSuccessListener(user) {

    const mUser = user as User;
    console.log(mUser.uid);
    (await Storage.set({ key: 'signedIn', value: 'userSignedIn' }));
    this.setUserData(mUser.uid, mUser.phone);
    this.router.navigateByUrl('homenav');

  }


  setUserData(useruid, phonenumber) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${useruid}`);

    const userData = {
      uid: useruid,
      phoneNumber: phonenumber,
      displayName: '',
      photoURL: '',
    };
    return userRef.set(userData, {
      merge: true
    });
  }


}
