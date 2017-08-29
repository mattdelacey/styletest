import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';
import { RefDetailPage } from '../refdetail/refdetail';
import { BrandData } from '../../providers/brand-data';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ref',
  templateUrl: 'ref.html'
})
export class RefPage {

	refs = [];
  myBrandData = {};

  constructor(private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, public brandData: BrandData) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefPage');
    this.myBrandData = this.brandData.getBrand();

    const query = new Kinvey.Query();
  	query.equalTo('icon2', 'md-document');
  	Kinvey.Files.find(query)
    	.then((files: {}[]) => {
    		this.refs = files;
      	console.log(files);
      	this.ref.detectChanges();
    	})
    	.catch((error: Kinvey.KinveyError) => {
      	console.log(error);
    	});

    }

    getDetail(ref) {
      console.log('inside get ref detail');

      console.log(ref);

      this.navCtrl.push(RefDetailPage, {
        ref: ref
      });
    }
}
