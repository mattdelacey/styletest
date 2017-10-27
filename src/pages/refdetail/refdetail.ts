import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Kinvey } from 'kinvey-angular2-sdk';
import { DomSanitizer } from '@angular/platform-browser';
//import { DomSanitizationService } from '@angular/platform-browser';
import { BrandData } from '../../providers/brand-data';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-refdetail',
  templateUrl: 'refdetail.html'
})
export class RefDetailPage {

	refs = [];
  myref = {} as any;
  myBrandData = {};

  constructor(private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer, public brandData: BrandData) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefDetailPage');
    this.myBrandData = this.brandData.getBrand();

    var myurl = this.navParams.get('ref')._downloadURL;
    myurl = 'https://docs.google.com/gview?embedded=true&url=' + myurl;
    console.log( myurl );

    this.myref = this.navParams.get('ref');
    this.myref._downloadURL = myurl;

    this.ref.detectChanges();

  }
}
