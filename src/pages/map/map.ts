import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';

//import { AccountDetailPage } from '../accountdetail/accountdetail';
import { BrandData } from '../../providers/brand-data';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
  
})
export class MapPage {

	accounts = [];
  myBrandData = {};

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  locations:any;
  gmarkers = [];




  constructor(private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, private brandData: BrandData) {}

  /*addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
 
    let content = "<h4>Information!</h4>";          
 
    this.addInfoWindow(marker, content);
 
  }

  addInfoWindow(marker, content) {
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
 
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
 
  }*/


  loadMap() {
    console.log('initializing map');

    var myLatlng = new google.maps.LatLng(39.8282109, -98.5795706);

            var mapOptions = {
                center: myLatlng,
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement,//document.getElementById("mymap"),
                mapOptions);
  }

  populateMap() {
    console.log('populating map');

    const dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network) as any;

    dataStore.find()
    .subscribe((locations: {}[]) => {
      this.locations = locations;
      console.log(this.locations);
      
      for (var i = 0; i < this.locations.length; i++) {
                        var mylat = parseInt(this.locations[i]._geoloc[0]);
                        var mylong = parseInt(this.locations[i]._geoloc[1]);
                        console.log(mylat + ", " + mylong);
                        console.log(this.locations[i].accountname);
                        var info = new google.maps.InfoWindow({
                            content: '<b>Who:</b> ' + this.locations[i].accountname + '<br><b>Notes:</b> ' + this.locations[i].accountcompany
                        });


                        /*var mapOptions = {

                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };*/

                        var myLatlng = new google.maps.LatLng(mylat, mylong);
                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: this.map,
                            title: this.locations[i].accountname
                        });
                        this.gmarkers.push(marker);
                        google.maps.event.addListener(marker, 'click', (function(info) {
                            return function() {
                                info.open(this.map, this);
                            }
                        })(info));

                    }
    }, (error: Kinvey.KinveyError) => {
      console.log(error);
    }, () => {
      this.ref.detectChanges();
      console.log('finished loading accounts for mapping');
    });
  }

  refreshMe() {
    console.log('refreshing accounts');

    /*const dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network) as any;

    dataStore.find()
    .subscribe((entities: {}[]) => {
      console.log(entities);
      this.accounts = entities;
    }, (error: Kinvey.KinveyError) => {
      console.log(error);
    }, () => {
      this.ref.detectChanges();
      console.log('finished loading accounts');
    });*/
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    this.loadMap();
    this.populateMap();
    /*console.log(this.brandData.getBrand());
    this.myBrandData = this.brandData.getBrand();
    //this.brandData.setBrand({foo:"accounts"});
    this.refreshMe();*/
  }



}
