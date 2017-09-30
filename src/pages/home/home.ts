import { Component, ChangeDetectorRef } from '@angular/core';
import { Kinvey } from 'kinvey-angular2-sdk';
import { Events, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { BrandData } from '../../providers/brand-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private ref: ChangeDetectorRef, public navCtrl: NavController, private brandData: BrandData, public events:Events) {
    
  }

  myBrandData={} as any;
  myHeaderColor ="";


  ionViewDidEnter() {
    console.log('loading home screen');

    // see if there is an active user
    //
    const activeUser = Kinvey.User.getActiveUser();

    if (activeUser) {
      console.log( 'active user exists, stay home');
      const dataStore = Kinvey.DataStore.collection('DemoBrandingData', Kinvey.DataStoreType.Network) as any;
    
    
    dataStore.find()
      .subscribe((entities: {}[]) => {
        console.log(entities[0]);
        
        this.brandData.setBrand( entities[0] );
        this.myBrandData = entities[0];
        
        
        try {
          console.log(this.myBrandData.menuStyle.menuStyles);
        
        
        this.events.publish('menu:change', this.myBrandData.menuStyle.menuStyles);
        this.events.publish('tabs:change', this.myBrandData.tabStyles.tabStyles);
      } catch(err) {
        console.log(err);
      }
        
        
        
      }, (error: Kinvey.KinveyError) => {
        console.log(error);
      }, () => {
        this.ref.detectChanges();

        console.log('loading brand complete');
      });

    } else {
      console.log('no active user, redirect to login');
      this.navCtrl.setRoot(LoginPage);
      return;
    }

    
     
  }

}
