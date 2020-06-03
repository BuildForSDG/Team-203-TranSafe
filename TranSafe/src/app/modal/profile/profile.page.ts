import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

@ViewChild('uploader', {static: true}) uploader: ElementRef<HTMLInputElement>;
@ViewChild('imagedisp', {static: true}) imagedisp: ElementRef<HTMLImageElement>;


  constructor(private modalController: ModalController, private authservice: FirebaseAuthenticationService) { }

  @Input() public name: string;
  @Input() public phone: string;
  @Input() public email: string;
  @Input() public bio: string;
  @Input() public imgurl: string;

  setImg;
  ngOnInit() {
  }


  async closeModal() {


    // this.phone = this.dname.nativeElement.value;
    // this.email = this.dname.nativeElement.value;
    // this.bio = this.dname.nativeElement.value;

    // firestore upload

    console.log('Name:', this.name, 'Bio:', this.bio);
    // this.authservice.updateUserData(this.name,
    //                                 this.email,
    //                                 this.phone,
    //                                 this.imgurl,
    //                                 this.bio);
    await this.modalController.dismiss();
  }


  popFileChooser(): void {
    this.uploader.nativeElement.click();
  }

  onBioChange(event) {
    this.bio = event.target.value;
  }

  onEmailChange(event) {
    this.email = event.target.value;
  }

  onPhoneChange(event) {
    this.phone = event.target.value;
  }


  onNameChange(event) {
    this.name = event.target.value;

  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      console.log(file);
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.setImg = e.target.result;
        if ( this.imgurl !== this.setImg) {
          this.imgurl = this.setImg;
        }

    };
  }

  }



}