import { TabsPage } from './../tabs/tabs.page';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { from } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AngularFireDatabase } from 'angularfire2/database';
// tslint:disable-next-line: import-spacing
import  * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { File } from '@ionic-native/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  topics: Array<any> = [];
  result: Array<any> = [];
  message: any;
   userDoc: any;
  data: any;
  isUserLoggedIn: any = true;
  userInfo: any = {};
  filePath: any;
  imgsrc: any;
  // task: AngularFireUploadTask;
  check: any;
//  public downloadUrl: Observable<string>;
  progress: any;
profileimage: any;
username: any;
  image: string;
  storageRef: any;

  names: any = true;

  // tslint:disable-next-line: max-line-length
  constructor(private location: Location, private platform: Platform, public navCtrl: NavController, private fdb: AngularFireDatabase, public storage: AngularFireStorage, private camera: Camera, private afs: AngularFirestore, private file: File, public sanitizer: DomSanitizer, private http: HttpClient, private nativeHttp: HTTP, private plt: Platform, private loadingCtrl: LoadingController ) { }

  ngOnInit() {
    ( window as any).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
      defaultCountryCode: 'IN',
      facebookNotificationsEnabled: true,
    }, data => {
      this.isUserLoggedIn = true;
      ( window as any).AccountKitPlugin.getAccount( info => {
        this.userInfo = info;
        this.getuser();
       }, error => console.log(error));
    },
    error => console.log(error)
    );
  }

  logout() {
    (window as any ).AccountKitPlugin.logout();
    setTimeout(() => {
      this.isUserLoggedIn = false;
      this.data = '';
      navigator['app'].exitApp();
    }, 1000);
  }

  getuser() {
    let user;
    this.afs.doc('Profile Details/' + this.userInfo.phoneNumber).get().subscribe(( res: any) => {
      if (res.exists) {
        console.log(res.data());
        user = res.data();
        this.username = user.name;
        this.profileimage = user.image;
      } else {
        this.afs.doc('Profile Details/' + this.userInfo.phoneNumber).set({
          name: 'Guest',
          image: 'null'
        });
      }
      this.update();
    });
  }
  update() {
    this.afs.doc('Profile Details/' + this.userInfo.phoneNumber).valueChanges().subscribe(( res: any) => {
      this.username = res.name;
      this.profileimage = res.image;
    });
  }

}
