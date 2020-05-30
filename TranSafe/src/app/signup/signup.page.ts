import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthenticationService } from '../services/firebase-authentication.service';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';

export interface User {
  uid: string;
  phone: string;
}



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})





export class SignupPage implements OnInit {

  constructor(private authservice: FirebaseAuthenticationService) { }

  ngOnInit() {

     this.authservice.listenToSignIn();
  }

  authsuccesslistner(event: FirebaseUISignInSuccessWithAuthResult) {

    const userdata: User = {
      uid:  event.authResult.user.uid.toString(),
      phone: event.authResult.user.phoneNumber.toString()
    };



  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {


    this.authservice.listenToSignIn().unsubscribe();

  }

}
