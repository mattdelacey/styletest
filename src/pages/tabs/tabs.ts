import { ChangeDetectorRef, Component } from '@angular/core';

import { HomePage } from '../home/home';

import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  home: any = HomePage;
  
  

  //tabs:any;
  myTabs = [this.home];
  tabs:any;
  

  constructor(private ref: ChangeDetectorRef, public events:Events) {
  	console.log('*****constructed tabs*****');

  	if (!this.tabs) {
  		this.tabs = [
  		{"root": this.myTabs[0], "name": "Home", "icon":"md-home"}

  	];
  	}
  	
  	

  	console.log(this.tabs);

  	
  }



  

  ionViewDidLoad() {


  }
}
