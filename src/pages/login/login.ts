import { Component } from '@angular/core';
import { Kinvey } from 'kinvey-angular2-sdk';
import { NavController, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	userData = {
        email: "",
        password: ""
    };

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  validateUserMIC() {
    console.log('login with MIC');

    Kinvey.User.loginWithMIC('http://localhost:8100', Kinvey.AuthorizationGrant.AuthorizationCodeLoginPage, { version: 'v2' } as any)
      .then((user: Kinvey.User) => {
        console.log(user);
        const activeUser = Kinvey.User.getActiveUser();

        (activeUser as any).registerForLiveService()
          .then(() => {
            console.log('successfully registered for live service');
          })
          .catch(err => {
            console.log('live service error: ' + err);
        });

        this.navCtrl.setRoot(HomePage);
    })
    .catch((error: Kinvey.KinveyError) => {
        console.log(error);
        this.presentToast('ERROR: ' + error.message);
    });
  }

  validateUserKinvey() {
  	console.log('validate user Kinvey');

  	console.log( this.userData.email);

    Kinvey.User.login(this.userData.email, this.userData.password)
      .then((user: Kinvey.User) => {
        console.log('successfully authenticated user with Kinvey Auth');
        console.log(user);
        const activeUser = Kinvey.User.getActiveUser();

        (activeUser as any).registerForLiveService()
          .then(() => {
            console.log('successfully registered for live service');
          })
          .catch(err => {
            console.log('live service error: ' + err);
        });
        this.navCtrl.setRoot(HomePage);
    })
      .catch((error: Kinvey.KinveyError) => {
        console.log(error);
        this.presentToast('ERROR: ' + error.message);
    });
  }

  signUp() {

    if ( this.userData.email == '' || this.userData.password == '') {
      this.presentToast('please fill out username and password above');
      return;
    }
    console.log('signing up user');
    //var goodloading = Loading.create({content:'user signed up'});
   //var badloading = Loading.create({content:'error signing up user'});
    
    Kinvey.User.signup({
      username: this.userData.email,
      password: this.userData.password
    })
    .then((user: Kinvey.User) => {
      console.log('signed up user');
      this.presentToast('user successfully signed up');
      this.navCtrl.setRoot(HomePage);
    }).catch((error: Kinvey.KinveyError) => {
      console.log(error);
      this.presentToast(error.message);
    });
  }

  logout() {
      console.log('logging out user');
      Kinvey.User.logout()
      .then(() => {
          console.log('user logged out');
          this.presentToast('user logged out');
      })
      .catch((error: Kinvey.KinveyError) => {
          console.log( error);
          this.presentToast('ERROR: ' + error.message);
      });
  }

}
