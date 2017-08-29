import { Component, ChangeDetectorRef } from '@angular/core';
import { Kinvey } from 'kinvey-angular2-sdk';
import { NavController } from 'ionic-angular';
import { BrandData } from '../../providers/brand-data';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

	products: any;
  myBrandData = {};

  constructor(public navCtrl: NavController, private ref: ChangeDetectorRef, public brandData: BrandData) {

  }

  ionViewDidEnter() {
  	const dataStore = Kinvey.DataStore.collection('products', Kinvey.DataStoreType.Network);
    this.myBrandData = this.brandData.getBrand();

  	dataStore.find()
  	.subscribe((entities: {}[]) => {
    	console.log(entities);
    	this.products = entities;
    	this.ref.detectChanges();
  	}, (error: Kinvey.KinveyError) => {
    	console.log(error);
  	}, () => {
    	console.log('finished fetching products');
  	});
  }

}
