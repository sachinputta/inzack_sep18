import { TabsPage } from './../tabs/tabs.page';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // topics: string[];
  // result: any = [];
  topics: Array<any> = [];
  result: Array<any> = [];
  // data: any = [];
  message: any;
   userDoc: any;
  data: any;
  isUserLoggedIn: any = true;
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

  names: any = true;
  // tslint:disable-next-line: max-line-length
  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase, public storage: AngularFireStorage, private camera: Camera, private afs: AngularFirestore, private file: File, public sanitizer: DomSanitizer, private http: HttpClient, private nativeHttp: HTTP, private plt: Platform, private loadingCtrl: LoadingController ) {
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    ( window as any).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
      defaultCountryCode: 'IN',
      facebookNotificationsEnabled: true,
    }, data => {
      this.isUserLoggedIn = true;
      ( window as any).AccountKitPlugin.getAccount( info => {
        this.userInfo = info;
        this.generateTopics();
        this.getuser();
       }, error => console.log(error));
    },
    error => console.log(error)
    );
  }


generateTopics() {

this.afs.doc('journeys/userjourneys').valueChanges().subscribe((response: any) => {
  this.data = response;
  console.log(this.data);
  this.result = this.data.jouneys;
  this.result = this.result.filter(journey => {
    return(journey.type !== 'private');
  });
  console.log(this.result);
  this.topics = this.result;
  });

}


// getTopics(ev: any) {

//   const serVal = ev.target.value;

//   // tslint:disable-next-line: triple-equals
//   if (serVal && serVal.trim() != '') {
//     // this.generateTopics()
//     this.topics = this.result;
//     this.topics = this.topics.filter((topic) => {
//       return(topic.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
//     });
//   } else if (!serVal) {
//     this.generateTopics();
//     return(this.topics);
//   }
// }

getTopics(ev: any) {

  const serVal = ev.target.value;
  this.topics = this.result;
  // tslint:disable-next-line: triple-equals
  if (serVal && serVal.trim() != '') {
    // this.generateTopics()
     this.topics = this.result;
     this.topics = this.topics.filter(journey => {
        return(journey.purpose.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      });
  } else if (!serVal) {
    this.generateTopics();
    return(this.topics);
  }
}



logout() {
  (window as any ).AccountKitPlugin.logout();
  setTimeout(() => {
    this.isUserLoggedIn = false;
    this.data = '';
    this.navCtrl.navigateRoot('/profile');
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
