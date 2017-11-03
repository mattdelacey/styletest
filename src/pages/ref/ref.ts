import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


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

	refs = [{icon2: "md-person", prettyname: "This is some text"},
  {icon2: "md-person", prettyname: "The quick brown fox"},
  {icon2: "md-person", prettyname: "jumped over the lazy"},
  {icon2: "md-person", prettyname: "dog"},
  {icon2: "md-person", prettyname: "last one"}
  ];
  myBrandData = {};

  constructor(private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    
  }
}
