import { Component, ChangeDetectorRef } from '@angular/core';
import { Events, MenuController, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
  //providers: [BrandData]
})
export class AccountsPage {

	accounts = [{accountname: "Account #1", accountcompany: "Company #1"},
  {accountname: "Account #2", accountcompany: "Company #2"},
  {accountname: "Account #4", accountcompany: "Company #3"},
  {accountname: "Account #5", accountcompany: "Company #4"},
  {accountname: "Account #6", accountcompany: "Company #5"},
  {accountname: "Account #7", accountcompany: "Company #6"},
  {accountname: "Account #8", accountcompany: "Company #7"},
  ];
  myBrandData = {};



  constructor(private toastCtrl: ToastController, private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, private myMenu: MenuController, public events:Events) {}


  refreshMe() {
    console.log('refreshing accounts');

    
  }

  ionViewDidLeave() {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
    
  }
}
