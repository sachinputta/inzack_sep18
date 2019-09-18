import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';


const config = {
  // your firebase web config
  apiKey: 'AIzaSyDSJvgjHDkZ91MeNjbmdGR86bPYno8PXwU',
    authDomain: 'upload-ec2d4.firebaseapp.com',
    databaseURL: 'https://upload-ec2d4.firebaseio.com',
    projectId: 'upload-ec2d4',
    storageBucket: 'upload-ec2d4.appspot.com',
    messagingSenderId: '258152237114',
    appId: '1:258152237114:web:044a7974b5ba9813'
 };




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  // tslint:disable-next-line: max-line-length
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, AngularFireModule.initializeApp(config), AngularFireStorageModule, AngularFireDatabaseModule,
    AngularFirestoreModule, HttpClientModule,  AngularFireAuthModule ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    Camera,
    File,
    PhotoViewer,
    VideoPlayer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
