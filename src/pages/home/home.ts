import { Component, ChangeDetectorRef } from '@angular/core';
import { Events, NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private ref: ChangeDetectorRef, public navCtrl: NavController, public events:Events) {
    
  }


  ionViewDidEnter() {
    console.log('loading home screen');

    

    
     
  }

}
