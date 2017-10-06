import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';
import { BrandData } from '../../providers/brand-data';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-accountdetail',
  templateUrl: 'accountdetail.html'
})
export class AccountDetailPage {

	accounts = [];
  account;
  //invoices = [] as any;
  myaccount = {};
  myBrandData = {};



  constructor(private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, private brandData: BrandData) {}


  ionViewDidLoad() {
    console.log('entering account details');

    this.account = this.navParams.get('account');
    console.log( this.account._id );
    this.myBrandData = this.brandData.getBrand();

    // do a lookup, based on _id
    //
    const dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network) as Kinvey.NetworkStore;

    dataStore.findById(this.account._id)
      .subscribe((entity: {}) => {
        console.log(entity);
        //this.accountname = entity.accountname;
        //this.invoices = entity.invoice;
        this.myaccount = entity;
        //this.myaccount._downloadURL = 'https://docs.google.com/gview?embedded=true&url=' + this.myaccount._downloadURL;
      }, (error: Kinvey.KinveyError) => {
        console.log(error);
      }, () => {
        console.log('finished fetching invoice data');
        this.ref.detectChanges();
      });
  }

}
