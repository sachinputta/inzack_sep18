import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { PhotoViewer, PhotoViewerOptions } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-viewjourney',
  templateUrl: './viewjourney.page.html',
  styleUrls: ['./viewjourney.page.scss'],
})
export class ViewjourneyPage implements OnInit {
  activeRoute: any;
  userDoc: any;
  data: any;
  data1: any;
  // tslint:disable-next-line: variable-name
  date_wise: {};
  isUserLoggedIn: any = false;
  userInfo: any = {};
  filePath: any;
  imgsrc: any;
  task: AngularFireUploadTask;
check: any;
date: any;

  public downloadUrl: Observable<string>;

  progress: any;  // Observable 0 to 100
profileimage: any;
username: any;
  image: string; // base64
  storageRef: any;
  comments = false;
  hide = true;
  journeyid: any;
  purposeid: any;
  textadvice: any;
  jourid: any;
  idpost: any;

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false
   };

  // tslint:disable-next-line: max-line-length
  constructor(private photoViewer: PhotoViewer,
              private act: ActivatedRoute,
              private fdb: AngularFireDatabase,
              public storage: AngularFireStorage,
              private camera: Camera,
              private afs: AngularFirestore,
              private file: File,
              public sanitizer: DomSanitizer,
              private http: HttpClient,
              private nativeHttp: HTTP,
              private plt: Platform,
              private loadingCtrl: LoadingController) {
    this.act.paramMap.subscribe(ParamMap => {
      if (!ParamMap.has('journeyid')) {

      } else {

       //  console.log(ParamMap.get('journeyid'));
        this.journeyid = ParamMap.get('journeyid');
        this.purposeid = ParamMap.get('purpose');
        console.log(this.journeyid);
        console.log(this.purposeid);
      }
    });
  }

  ngOnInit() {
    this.sample();
  }
  sample() {
    this.afs.doc('userJourneys/' + this.journeyid ).get().subscribe((response: any) => {
      this.data1 = response.data();
      console.log(this.data1);

      console.log(response.exists);
      this.check = response.exists;
      if (this.check) {
        this.fun();
    } else {
      this.afs.doc('userJourneys/' + this.journeyid).set({
        multimedia: [ ]
       });
      this.fun();
      }

    });
  }


  fun() {
    // tslint:disable-next-line: variable-name
     this.date_wise = {};
     this.afs.doc('userJourneys/' + this.journeyid).valueChanges().subscribe((res: any) => {
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

  viewimage(src) {
    const option: PhotoViewerOptions = {
      share: false
    };
    this.photoViewer.show(src);
   }

   sendadvice(jrnyid, postid) {
    console.log(this.journeyid, postid);
    console.log(this.textadvice);
    this.afs.doc('userJourneys/' + this.journeyid).get().subscribe(( res: any) => {
   console.log(res);
   console.log(res.data());
   let x;
   const ad_data = res.data();
   // tslint:disable-next-line: forin
   for (x in ad_data.multimedia) {
       if (ad_data.multimedia[x].postid === postid) {
         console.log(ad_data.multimedia[x], postid);
         ad_data.multimedia[x].comments.push(this.textadvice);
       }
     }
   console.log(ad_data.multimedia);
   this.afs.doc('userJourneys/' + this.journeyid).update(
     {
       multimedia: ad_data.multimedia
     }
   );
   this.textadvice = '' ;
    });
  }
}
