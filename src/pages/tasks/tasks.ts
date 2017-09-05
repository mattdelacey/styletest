import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';

import { BrandData } from '../../providers/brand-data';
import { Camera } from 'ionic-native';
//import { Base64Binary } from 'base64-binary';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html'
  //providers: [BrandData]
})

export class TasksPage {

	accounts = [];
  myBrandData = {};
  taskData = {
    Title: "Personal Task",
    class: "Personal",
    duedate:"",
    completed:false,
    action: ""
  }

  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

  public base64Image: string;

  constructor(private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public brandData: BrandData) {}

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
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = imageData;
    }, (err) => {
        console.log(err);
    });

  }

  decodeArrayBuffer(input) {
    var bytes = (input.length/4) * 3;
    var ab = new ArrayBuffer(bytes);
    this.decode(input, ab);

    return ab;
  }

  removePaddingChars(input){
    var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
    if(lkey == 64){
      return input.substring(0,input.length - 1);
    }
    return input;
  }

  decode(input, arrayBuffer) {
    //get last chars to see if are valid
    input = this.removePaddingChars(input);
    input = this.removePaddingChars(input);

    var bytes = (input.length / 4) * 3;

    var uarray;
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    var j = 0;

    if (arrayBuffer)
      uarray = new Uint8Array(arrayBuffer);
    else
      uarray = new Uint8Array(bytes);

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    for (i=0; i<bytes; i+=3) {
      //get the 3 octects in 4 ascii chars
      enc1 = this._keyStr.indexOf(input.charAt(j++));
      enc2 = this._keyStr.indexOf(input.charAt(j++));
      enc3 = this._keyStr.indexOf(input.charAt(j++));
      enc4 = this._keyStr.indexOf(input.charAt(j++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      uarray[i] = chr1;
      if (enc3 != 64) uarray[i+1] = chr2;
      if (enc4 != 64) uarray[i+2] = chr3;
    }

    return uarray;
  }

  submitMe() {
    console.log('submitme');

    console.log(this.taskData.duedate);
    console.log(this.taskData.action);
    console.log(this.taskData.completed);

    // upload image data
    //
    let myFile = this.base64Image;
    const fileContent = myFile;//this.decodeArrayBuffer(myFile);//myFile;//"data:image/jpeg;base64," + this.base64Image;
    const metadata ={

      filename: 'ServicePic.jpg',
      mimeType: 'image/jpeg',
      size: fileContent.length
    };
    Kinvey.Files.upload(fileContent, metadata)
      .then((file: {}) => {
        console.log(file);
      })
      .catch((error: Kinvey.KinveyError) => {
        console.log(error);
      });

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
