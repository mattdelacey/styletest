import { Component, ChangeDetectorRef } from '@angular/core';
import { Kinvey } from 'kinvey-angular2-sdk';
import { NavController } from 'ionic-angular';
import { BrandData } from '../../providers/brand-data';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

	selectOptions = [];

  selectedValue:string;
  myBrandData={};

  selectedEntity = {};

  constructor(private ref: ChangeDetectorRef, public navCtrl: NavController, public brandData: BrandData) {

  }

  selectMe(selectedValue: any) {
    console.log('selectMe');

    // do a lookup based on the slected title
    //
    const dataStore = Kinvey.DataStore.collection('products', Kinvey.DataStoreType.Network);
    const query = new Kinvey.Query();
    console.log(selectedValue);
    query.equalTo('title', selectedValue);

    dataStore.find(query)
    .subscribe((data: Array<{}>) => {
      console.log(data);
      this.selectedEntity = data[0];
    }, (error: Kinvey.KinveyError) => {
      console.log(error);
    }, () => {
      this.ref.detectChanges();
      console.log('search query completed');
    });


  }

  ionViewDidEnter() {
  	console.log('entering search view');

    this.myBrandData = this.brandData.getBrand();

  	const dataStore = Kinvey.DataStore.collection('products', Kinvey.DataStoreType.Network);
  	const query = new Kinvey.Query();
	(query as any).fields = [ 'title' ];
  	 dataStore.find(query)
  		.subscribe((entities: {}[]) => {
    		console.log(entities);
    		this.selectOptions = entities;
    		//selectOptions = entities.title;
        
  		}, (error: Kinvey.KinveyError) => {
    		console.log(error);
  		}, () => {
  			this.ref.detectChanges();
    		console.log('loading search options complete');
  		});
  }

}
