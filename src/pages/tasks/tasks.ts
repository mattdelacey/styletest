import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';

import { BrandData } from '../../providers/brand-data';
import { Camera } from 'ionic-native';
//import { File, Entry } from '@ionic-native/file';
import { File } from 'ionic-native';

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
    action: ""
  }

  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

  public base64Image: string;
  public fileURI: string;

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

  /*decodeArrayBuffer(input) {
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
  }*/

  submitMe() {
    console.log('submitme');

    console.log(this.taskData.duedate);
    console.log(this.taskData.action);
    console.log(this.taskData.completed);


    (this.file as any).resolveLocalFileSystemURL(this.fileURI,
                function(fileEntry) {
                    fileEntry.file(function(file) {
                        console.log(file);

                        /*var reader = new FileReader();
                        var myindex = $scope.taskInfo.myfile.lastIndexOf('/') + 1;
                        var mystring = $scope.taskInfo.myfile.substring(myindex);

                        reader.onload = function(event) {
                            console.log('onload');;
                            console.log(event);
                        }

                        reader.onloadend = function(event) {
                            console.log('onloadend');
                            var imagedata = event.target._result;
                            console.log(imagedata.byteLength);
                            var metadata = {
                                filename: "ServicePic.jpg",
                                mimeType: "image/jpeg",
                                size: imagedata.byteLength,
                                public: true
                            };
                            console.log(event);*/

                           /* var promise = $kinvey.Files.upload(imagedata, metadata)
                                .then(function(myfile) {
                                    console.log(myfile);
                                    var promise = $kinvey.Files.stream(myfile._id)
                                        .then(function(file) {
                                            console.log(file);
                                            $scope.taskInfo.savedurl = file._downloadURL;

                                        })
                                        .catch(function(error) {
                                            console.log(error);
                                        });

                                })
                                .catch(function(error) {
                                    console.log(error);
                                });*/
                       // };

                        /*reader.readAsArrayBuffer(file);*/
                    });
                }
            );


    // upload image data
    //
    /*let myFile = this.base64Image;
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
    });*/

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
