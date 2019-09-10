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
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userDoc: any;
  data: any;
  isUserLoggedIn: any = false;
  userInfo: any = {};

  // tslint:disable-next-line: max-line-length
  constructor( private location: Location, private platform: Platform, private fdb: AngularFireDatabase, public storage: AngularFireStorage, private camera: Camera, private afs: AngularFirestore, private file: File, public sanitizer: DomSanitizer, private http: HttpClient, private nativeHttp: HTTP, private loadingCtrl: LoadingController) { }

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
        this.getchats();
       }, error => console.log(error));
    },
    error => console.log(error)
    );
  }

  getchats() {
    this.userDoc = this.afs.doc<any>('Profile Details/' + this.userInfo.phoneNumber).valueChanges().subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
    });
  }

}
