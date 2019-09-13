import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
// import {Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
// tslint:disable-next-line: import-spacing
import  * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { File } from '@ionic-native/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { from } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


declare var window: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private location: Location, private platform: Platform, private fdb: AngularFireDatabase, public storage: AngularFireStorage, private camera: Camera, private afs: AngularFirestore, private file: File, public sanitizer: DomSanitizer, private http: HttpClient, private nativeHttp: HTTP, private loadingCtrl: LoadingController) {
    this.Fbref = firebase.storage().ref();
  }

  userDoc: any;
  data: any;
  isUserLoggedIn: any = false;
  userInfo: any = {};
  filePath: any;
  imgsrc: any;
  date: any;
  task: AngularFireUploadTask;
check: any;
  public downloadUrl: Observable<string>;
  public Fbref: any;
  task1: any;
  progress: any;
  videosrc: any;
  newprog: any;


profileimage: any;
username: any;
  image: string; // base64
  storageRef: any;
  purpose: any;
  type: any;
  public dateTime: any;
  jid: any;
  userDocActive: any;
  datajourney: any;
  uploadmessage = '';
  userDoc1: any;

  filePath1 = `${ new Date().getTime() }.mp4`;

  ngOnInit() {
    ( window as any).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
      defaultCountryCode: 'IN',
      facebookNotificationsEnabled: true,
    }, data => {
     // this.isUserLoggedIn = true;
      ( window as any).AccountKitPlugin.getAccount( info => {
        this.userInfo = info;
        console.log(this.userInfo.phoneNumber);
        this.userDoc = this.afs.doc<any>('journey_creation/' + this.userInfo.phoneNumber).valueChanges().subscribe((res: any) => {
          this.data = res;
          console.log('in status');
        });
       }, error => console.log(error));
    },
    error => console.log(error)
    );
  }





createjourney() {
  this.userDoc = this.afs.doc<any>('journey_creation/' + this.userInfo.phoneNumber).get().subscribe((res: any) => {
    this.data = res.data();
   // console.log(this.data.isactive);
    if (this.data.isactive !== true) {

  this.userDocActive = this.afs.doc<any>('journey_creation/' + this.userInfo.phoneNumber);
  this.userDocActive.update({
   isactive: true
  });
  this.userDoc = this.afs.doc<any>('journeys/userjourneys');
  this.dateTime = new Date();
  this.jid = 'INZ' + this.userInfo.phoneNumber,
  this.userDoc.update(
    {
      journeys: firebase.firestore.FieldValue.arrayUnion(
       {
        jid: this.jid,
        number: this.userInfo.phoneNumber,
        purpose: this.purpose,
        type: this.type,
        timestamp: this.dateTime,
        image: 'https://anotherjavaduke.files.wordpress.com/2018/08/avataaars-2.png',
       })
   });
  this.afs.doc('userJourneys/' + this.jid ).set({
    multimedia: [ ]
   });
  this.userDoc1 = this.afs.doc<any>('userJourneys/' + this.jid);
  this.userDoc1.update(
    {
        jid: this.jid,
        number: this.userInfo.phoneNumber,
        purpose: this.purpose,
        type: this.type,
        timestamp: this.dateTime,
        image: 'https://anotherjavaduke.files.wordpress.com/2018/08/avataaars-2.png',
   });
    }
  });


}


}
