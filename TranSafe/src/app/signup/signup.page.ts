import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthenticationService } from '../services/firebase-authentication.service';



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

  authsuccesslistner(event) {
    this.authservice.firebaseAuthSuccessListener(event);
    this.authservice.listenToSignIn().unsubscribe();
  }


}
