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
  selector: 'page-offline',
  templateUrl: 'offline.html'
})
export class OfflinePage {

	accounts = [];
  myBrandData = {};

  autoCreate(n) {
        //var accounts = [];
        for (var i = 0; i < n; i++) {
            const account = {
                "accountname": "Account #" + i,
                "accountcompany": "Company #" + i,
                "autogen": true,
                "Title": "Sync Data"
            }
            this.accounts.push(account);
            this.saveToStore(account);
        }
        console.log(this.accounts);
        //this.accounts(accounts);
    }



    saveToStore(data) {
        //save the task to the store
        var dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Sync);

        dataStore.save(data).then(function(result) {
            console.log(result);
            //accounts.push
            //$scope.accounts = $scope.accounts.concat(result);
            /*$scope.$digest();
            $ionicLoading.show({
                template: '' + data.length + ' task(s) inserted',
                noBackdrop: true,
                duration: 2000
            });*/

        }).catch(function(error) {
            console.log(error);
        });
    }


  constructor(private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, private brandData: BrandData) {}


  addMe() {
    console.log('adding dummy records');

    this.autoCreate(5);
  }

  refreshMe() {
    console.log('refreshing accounts');

    const dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network) as any;

    dataStore.find()
    .subscribe((entities: {}[]) => {
      console.log(entities);
      this.accounts = entities;
    }, (error: Kinvey.KinveyError) => {
      console.log(error);
    }, () => {
      this.ref.detectChanges();
      console.log('finished loading accounts');
    });
  }


  syncMe() {
    console.log('synching accounts');

    const dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Sync) as any;
    dataStore.sync().then((entities: Array<{}>) => {
  
}).catch((error: Kinvey.KinveyError) => {
  console.log(error);
});
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflinePage');
    console.log(this.brandData.getBrand());
    //this.brandData.setBrand({foo:"accounts"});
    this.refreshMe();
  }



}
