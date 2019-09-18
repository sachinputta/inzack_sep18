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
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {



  // tslint:disable-next-line: max-line-length
  constructor(private location: Location,
              private platform: Platform,
              private fdb: AngularFireDatabase,
              public storage: AngularFireStorage,
              private camera: Camera,
              private afs: AngularFirestore,
              private file: File,
              public sanitizer: DomSanitizer,
              private http: HttpClient,
              private nativeHttp: HTTP,
              private loadingCtrl: LoadingController) {
 // this.getphonenumber();
 this.Fbref = firebase.storage().ref();
  }
  activeRoute: any;
  userDoc: any;
  data: any;
  // tslint:disable-next-line: variable-name
  date_wise: {};
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
  comments = false;
  hide = true;
  public dateTime: any;
  getsec: any;

  // slideOptsOne = {
  //   initialSlide: 0,
  //   slidesPerView: 1,
  //   autoplay: false
  //  };
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet(index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    }
  };

   date: any;
   public Fbref: any;
   task1: any;
   videosrc: any;
   newprog: any;
   purpose: any;
   type: any;
   jid: any;
   userDocActive: any;
   datajourney: any;
   uploadmessage = '';
   filePath1 = `${ new Date().getTime() }.mp4`;
 public options: CameraOptions = {
   sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
   destinationType: this.camera.DestinationType.FILE_URI,
   mediaType: this.camera.MediaType.VIDEO
 };

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
        this.sample();
       }, error => console.log(error));
    },
    error => console.log(error)
    );
  }

  async captureImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };
    return await this.camera.getPicture(options);
}

createUploadTask(file: string): void {

  this.filePath = `${ new Date().getTime() }.jpg`;
  console.log(this.filePath);
  this.image = 'data:image/jpg;base64,' + file;
  this.task = this.storage.ref(this.filePath).putString(this.image, 'data_url');
  const nowDate = new Date();
  const imagedate = nowDate.getDate() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getFullYear()  ;
  console.log(imagedate);
  this.dateTime = new Date();
  this.getsec = this.dateTime.getTime();
  this.progress = this.task.percentageChanges();
  this.task.percentageChanges().subscribe(res => {
      if ( res === 100) {
        setTimeout(() => {
          // tslint:disable-next-line: max-line-length
          this.imgsrc = 'https://firebasestorage.googleapis.com/v0/b/upload-ec2d4.appspot.com/o/'  + this.filePath +  '?alt=media&';
          // this.userDoc = this.afs.doc<any>('Registered Number/' + this.userInfo.phoneNumber);
          this.userDoc = this.afs.doc<any>('userJourneys/' + 'INZ' + this.userInfo.phoneNumber);
          this.userDoc.update(
       {
        multimedia: firebase.firestore.FieldValue.arrayUnion(
          {
           src: this.imgsrc,
           message: this.uploadmessage,
           type: 'image',
           date: imagedate,
           postid: this.getsec,
           userid: this.userInfo.phoneNumber,
          comments: [],
          advices: []
          })
      });

        }, 6000);
         }
    });
  console.log('https://firebasestorage.googleapis.com/v0/b/upload-ec2d4.appspot.com/o/' + this.filePath + '?alt=media&');


}

async uploadHandler() {
  const base64 = await this.captureImage();
  this.createUploadTask(base64);
 }



  sample() {
    this.afs.doc('userJourneys/' + 'INZ' + this.userInfo.phoneNumber).get().subscribe((response: any) => {
      // this.data = response.data();
      // console.log(this.data);

      console.log(response.exists);
      this.check = response.exists;
      if (this.check) {
        this.fun();
    } else {
      this.afs.doc('userJourneys/' + 'INZ' + this.userInfo.phoneNumber).set({
        multimedia: [ ]
       });
      this.fun();
      }

    });
  }


  fun() {
    // tslint:disable-next-line: variable-name
     this.date_wise = {};
     this.afs.doc('userJourneys/' + 'INZ' + this.userInfo.phoneNumber).valueChanges().subscribe((res: any) => {
      // console.log(res) ;
      this.date_wise = {};
     // this.data = res.multimedia;
     // console.log(this.data);
      // tslint:disable-next-line: forin
      for (const image in res.multimedia ) {
       // console.log(res.multimedia[image].date);
        if (!this.date_wise[res.multimedia[image].date]) {
         this.date_wise[res.multimedia[image].date]  = [ res.multimedia[image] ];
         this.data = this.date_wise[res.multimedia[image].date];
        //  console.log(this.data);
        } else {
          this.date_wise[res.multimedia[image].date].push(res.multimedia[image]);
        }
      }
      console.log(this.date_wise);
      this.data = Object.keys(this.date_wise);
      });
   }
   showcomments() {
    this.comments = true;
    this.hide = !this.hide;
  }
  hidecomments() {
    this.comments = false;
    this.hide = !this.hide;
  }



// video upload
getmedia() {
  this.camera.getPicture(this.options).then(fileuri => {
  window.resolveLocalFileSystemURL('file://' + fileuri, (FE: { file: (arg0: (file: any) => void) => void; }) => {
  FE.file((file: Blob) => {
  const FR = new FileReader();
  FR.onloadend = (res: any) => {
 const AF = res.target.result;
 const blob = new Blob([new Uint8Array(AF)], {type: 'video/mp4'});
 this.upload(blob);

  };
  FR.readAsArrayBuffer(file);
  });
  });
  });
  }

  upload(blob: Blob) {
  // this.filePath = `${ new Date().getTime() }.mp4`;
   console.log(this.filePath1);
   this.task1 = this.Fbref.child(this.filePath1).put(blob);

   // tslint:disable-next-line: only-arrow-functions
   this.task1.on('state_changed', function(snapshot: { bytesTransferred: number; totalBytes: number; state: any; }) {
     // tslint:disable-next-line: prefer-const
     // console.log(snapshot);
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     // console.log('Upload is ' + progress + '% done');
     console.log(progress);
     // tslint:disable-next-line: no-shadowed-variable
     switch (snapshot.state) {
       case firebase.storage.TaskState.PAUSED: // or 'paused'
         console.log('Upload is paused');
         break;
       case firebase.storage.TaskState.RUNNING: // or 'running'
         console.log('Upload is running');
         break;
     }
   // tslint:disable-next-line: only-arrow-functions
   }, function(error: any) {
     // console.log(error);
     // Handle unsuccessful uploads
   },  setTimeout(() => {
     // tslint:disable-next-line: max-line-length
     console.log(this.filePath1);
     // tslint:disable-next-line: max-line-length
     this.videosrc = 'https://firebasestorage.googleapis.com/v0/b/upload-ec2d4.appspot.com/o/'  + this.filePath1 +  '?alt=media&';
     console.log(this.videosrc);
     // console.log(this.phone);
     const nowDate = new Date();
     const imagedate = nowDate.getDate() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getFullYear()  ;
     console.log(imagedate);
     this.dateTime = new Date();
     this.getsec = this.dateTime.getTime();
     this.afs.doc('userJourneys/' + 'INZ' + this.userInfo.phoneNumber).update({
       multimedia: firebase.firestore.FieldValue.arrayUnion(
         {
          src: this.videosrc,
          type: 'video',
          message: this.uploadmessage,
          date: imagedate,
          postid: this.getsec,
          userid: this.userInfo.phoneNumber,
          comments: [],
          advices: []
         })
       } );
   }, 5000)

   );

  }

}
