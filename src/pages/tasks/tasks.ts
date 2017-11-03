import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';

import { BrandData } from '../../providers/brand-data';
import { Camera } from 'ionic-native';
//import { File, Entry } from '@ionic-native/file';
import { File } from '@ionic-native/file';
//import { File } from 'ionic-native';



@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html'
})

export class TasksPage {

	accounts = [];
  myBrandData = {};
  taskData = {
    Title: "Personal Task",
    class: "Personal",
    duedate:"",
    completed:false,
    action: "",
    savedpic: ""
  }



  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

  public base64Image: string;
  public fileURI: string;
  public cordova: any; 
  public savedurl: string;

  constructor(public file:File, private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public brandData: BrandData) {}

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  photoMe() {
     console.log('saving picture');

        Camera.getPicture({
        destinationType: Camera.DestinationType.FILE_URI,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.fileURI = imageData;
    }, (err) => {
        console.log(err);
    });

  }

  

  /*submitMe() {
    console.log('submitme');

    const dataStore = Kinvey.DataStore.collection('tasks', Kinvey.DataStoreType.Network) as Kinvey.NetworkStore;

    dataStore.save(this.taskData)
    .then((entity: {}) => {
      console.log(entity);
      console.log(this);
      this.presentToast("Successfully saved task");
    }).catch(function(error: Kinvey.KinveyError) {
      console.log(error);
      this.presentToast('ERROR: ' + error.message);
    });
  }*/

  submitMe() {
    console.log('submitme');

    console.log(this.taskData.duedate);
    console.log(this.taskData.action);
    console.log(this.taskData.completed);

    console.log(this.fileURI);

    this.file.resolveLocalFilesystemUrl(this.fileURI).then((fileEntry) => {
        console.dir(fileEntry);

        console.log( this.fileURI );

        var myindex = this.fileURI.lastIndexOf('/') + 1;
        var myfile = this.fileURI.substring(myindex);
        var mypath = this.fileURI.substring(0, myindex);

        console.log(mypath);

        console.log(myfile);

        this.file.readAsArrayBuffer(mypath, myfile).then((fileData) => {
            console.log(fileData);
            console.log(fileData.byteLength);

            const metadata ={
              filename: 'ServicePic.jpg',
              mimeType: 'image/jpeg',
              size: fileData.byteLength
            };
            Kinvey.Files.upload(fileData, metadata)
              .then((file: {}) => {
                console.log(file);

                Kinvey.Files.stream((file as any)._id)
                .then((file: {}) => {
                  this.taskData.savedpic = (file as any)._downloadURL;
                  //console.log( this.taskData );

                  console.dir( this.taskData );
                   const dataStore = Kinvey.DataStore.collection('tasks', Kinvey.DataStoreType.Network) as Kinvey.NetworkStore;
                  dataStore.save(this.taskData)
                .then((entity: {}) => {
                  console.log(entity);
                  console.log(this);
                  this.presentToast("Successfully saved task");
                }).catch(function(error: Kinvey.KinveyError) {
                  console.log(error);
                  this.presentToast('ERROR: ' + error.message);
                });
                })
                .catch((error: Kinvey.BaseError) => {
                  console.log(error);
                });

                

                
              })
              .catch((error: Kinvey.BaseError) => {
                console.log(error);
              });
        });

        
    });
    
  }


  refreshMe() {
    console.log('refreshing accounts');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');

    console.log( this.brandData.getBrand() );
    this.myBrandData = this.brandData.getBrand();
  }
}
