import { Component, OnInit } from '@angular/core';
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
import { Platform, LoadingController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  userDoc: any;
  data: any;
  isUserLoggedIn: any = false;
  userInfo: any = {};
  filePath: any;
  imgsrc: any;
  task: AngularFireUploadTask;
check: any;
  public downloadUrl: Observable<string>;

  progress: any;  // Observable 0 to 100
profileimage: any;
username: any;
  image: string; // base64
  storageRef: any;
  userDoc1: any;

  // tslint:disable-next-line: max-line-length
  constructor(private fdb: AngularFireDatabase, public storage: AngularFireStorage, private camera: Camera, private afs: AngularFirestore, private file: File, public sanitizer: DomSanitizer, private http: HttpClient, private nativeHttp: HTTP, private loadingCtrl: LoadingController) {}

  ngOnInit() {
  }



  async register() {
    ( window as any).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
      defaultCountryCode: 'IN',
      facebookNotificationsEnabled: true,
    }, data => {
      this.isUserLoggedIn = true;
      ( window as any).AccountKitPlugin.getAccount( info => {
        this.userInfo = info;
        this.userDoc1 = this.afs.doc<any>('journeys/userjourneys').get().subscribe((res: any) => {
          this.check = res.exists;
          if (this.check) {
            console.log('exists');
          } else {
            this.afs.doc('journeys/userjourneys').set({
            });
          }

        });

        this.userDoc = this.afs.doc<any>('journey_creation/' + this.userInfo.phoneNumber).get().subscribe((res: any) => {
          this.check = res.exists;
          if (this.check) {
            this.afs.doc('journey_creation/' + this.userInfo.phoneNumber).set({
              isactive: true,
            });
          } else {
            this.afs.doc('journey_creation/' + this.userInfo.phoneNumber).set({
              isactive: false,
            });
          }
        });
       }, error => console.log(error));
    },
    error => console.log(error)
    );

  }





}


