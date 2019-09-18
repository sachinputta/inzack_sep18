import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
import { Platform, LoadingController, IonSlides } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { PhotoViewer, PhotoViewerOptions } from '@ionic-native/photo-viewer/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';



declare var window: any;


@Component({
  selector: 'app-datewisejourney',
  templateUrl: './datewisejourney.component.html',
  styleUrls: ['./datewisejourney.component.scss'],
})
export class DatewisejourneyComponent implements OnInit {
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
Segments = '1';

  public downloadUrl: Observable<string>;

  progress: any;
profileimage: any;
username: any;
  image: string;
  storageRef: any;
  comments = false;
  advices = false;
  hide = true;
  userprofileimage: any;
  page = '0';

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
  jrnydata: any;
  disableButton;
   date: any;
   public Fbref: any;
   task1: any;
   videosrc: any;
   newprog: any;
   purpose: any;
   type: any;
   public dateTime: any;
   jid: any;
   userDocActive: any;
   datajourney: any;
   uploadmessage = '';
   journeyid: any;
   filePath1 = `${ new Date().getTime() }.mp4`;
 public options: CameraOptions = {
   sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
   destinationType: this.camera.DestinationType.FILE_URI,
   mediaType: this.camera.MediaType.VIDEO
 };


@Input() t: any;
@ViewChild('slider', { static: false }) slider: IonSlides;
  // tslint:disable-next-line: max-line-length
  constructor(private videoPlayer: VideoPlayer,
              private photoViewer: PhotoViewer,
              public alertController: AlertController,
              private location: Location,
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


  ngOnInit() {
   // this.sample();
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




  sample() {
    this.afs.doc('userJourneys/' + 'INZ' + this.userInfo.phoneNumber).get().subscribe((response: any) => {
      // this.data = response.data();
      // console.log(this.data);

      console.log(response.exists);
      this.check = response.exists;
      if (this.check) {
        this.fun();
    } else {
      this.afs.doc('userJourneys/' + 'INZ' + this.userInfo.phoneNumber ).set({
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
      this.jrnydata = res.purpose;
      this.journeyid = res.jid;
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
   showadvices() {
    this.advices = true;
    this.hide = !this.hide;
  }
  hideadvices() {
    this.advices = false;
    this.hide = !this.hide;
  }
  showcomments() {
    this.comments = true;
    this.hide = !this.hide;
  }
  hidecomments() {
    this.comments = false;
    this.hide = !this.hide;
  }


  help() {
    this.disableButton = true;
    this.afs.doc('Profile Details/' + this.userInfo.phoneNumber).valueChanges().subscribe((response: any) => {
     // this.data = response.image;
     // console.log(this.data.image);
      this.dateTime = new Date();
      this.userprofileimage = response.image;

      this.afs.doc('advices/' + this.t.postid).get().subscribe((res: any) => {
        console.log(res.exists);
        this.check = res.exists;
        if (this.check) {
          this.userDoc = this.afs.doc<any>('advices/' + this.t.postid);
          this.userDoc.update(
         {
        advices: firebase.firestore.FieldValue.arrayUnion(
          {
          postid: this.t.postid,
           issue: this.t.message,
           usernumber: this.t.userid,
           image: this.userprofileimage,
           Timestamp: this.dateTime,
           purpose: this.jrnydata,
           idjourney: this.journeyid,
          })
        });
      } else {
        this.afs.doc('advices/' +  this.t.postid).set({
          advices: [ ]
         });
        }
      });


    });
    }


    viewimage(src) {
      this.photoViewer.show(src);
     }
}


