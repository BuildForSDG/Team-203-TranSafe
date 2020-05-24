import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {  Router } from '@angular/router';

import {User} from 'firebase';

import { Plugins } from '@capacitor/core';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';


const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(private auth0: AngularFireAuth,  private router: Router,  private afs: AngularFirestore) { }


  listenToSignIn() {
    return this.auth0.authState.subscribe((value: User) => {
      if (value) {


        console.log(value.uid);
        console.log(value.phoneNumber);
        this.storeSignUp();
        this.setUserData(value.uid, value.phoneNumber).then(() => {
          this.router.navigateByUrl('homenav');
        });
    }
  });
  }


  async storeSignUp() {
    (await Storage.set({ key: 'signedIn', value: 'userSignedIn' }));
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
