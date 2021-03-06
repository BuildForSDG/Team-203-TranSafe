import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot, Action } from '@angular/fire/firestore';
import {  Router } from '@angular/router';

import {User} from 'firebase';

import { Plugins } from '@capacitor/core';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RefData } from '../user-profile/user-profile.page';

const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {


  muid;
  constructor(private auth0: AngularFireAuth,
              private router: Router,
              private afs: AngularFirestore,
              private storage: AngularFireStorage
              ) { }


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

  updateUserData(dname, demail, dphone, dimgurl, dbio) {
    this.auth0.user.subscribe(user => {
      console.log('This is ist', dimgurl, typeof(dimgurl));
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid.toString()}`);
      const storageUrl = 'profile_images/';
      const storageRef = this.storage.ref(storageUrl + String(`image${Date.now()}`));
      if (!dimgurl || typeof(dimgurl) === 'string') {
        console.log('worked');
        const userData = {
          phoneNumber: dphone,
          displayName: dname,
          bio: dbio,
          email: demail
        };

        return userRef.set(userData, {
          merge: true
        });
      } else {

        const task = storageRef.put(dimgurl);

        task
        .snapshotChanges()
        .pipe( finalize( () => {
          storageRef.getDownloadURL().subscribe(murl => {

            const newUrl = String(murl).replace('?', '_400x400?');
            const userData = {
              phoneNumber: dphone,
              displayName: dname,
              photoURL: newUrl,
              bio: dbio,
              email: demail
            };

            return userRef.set(userData, {
              merge: true
            });
          });

        } ) ).subscribe();

      }

         });


  }




  getUserdata(uuid: string) {
    console.log(uuid);
    return this.afs.collection('users')
    .doc(uuid)
    .snapshotChanges();



  }


}
