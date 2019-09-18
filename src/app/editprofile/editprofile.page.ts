import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute} from '@angular/router';
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


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
 uname: any;
  userDoc: any;
  data: any;
  isUserLoggedIn: any = false;
  userInfo: any = {};
  filePath: any;
  imgsrc: any;
  task: AngularFireUploadTask;
  check: any;
  public downloadUrl: Observable<string>;
  userphonenumber: any;
  profileimage: any;

  progress: any;

  image: string;
  storageRef: any;
  // tslint:disable-next-line: max-line-length
  constructor(private act: ActivatedRoute, public activeRoute: ActivatedRoute , private fdb: AngularFireDatabase, public storage: AngularFireStorage, private camera: Camera, private afs: AngularFirestore, private file: File, public sanitizer: DomSanitizer, public actionSheetController: ActionSheetController, public alertController: AlertController) { }

  ngOnInit() {
    this.act.paramMap.subscribe(ParamMap => {
      if (!ParamMap.has('phone')) {

      } else {
        this.userphonenumber = ParamMap.get('phone');
        console.log(this.userphonenumber);
        this.getuser();
      }
    });
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          console.log('clicked camera');
          this.uploadHandler();
        }
      }, {
        text: 'Gallery',
        icon: 'photos',
        handler: () => {
          console.log('clicked gallery');
          this.addimageHandler();
        }
      },
       {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: ' Enter your name',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'your name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.uname = data.name1;
           // console.log(data.name1);
            this.userDoc = this.afs.doc<any>('Profile Details/' +  this.userphonenumber);
            this.userDoc.update(
         {
           name: this.uname,
        });
            this.updatename();
          }
        }
      ]
    });

    await alert.present();
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

async addImage() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  };
  return await this.camera.getPicture(options);
}


createUploadTask(file: string): void {

  this.filePath = `${ new Date().getTime() }.jpg`;
  console.log(this.filePath);
  this.image = 'data:image/jpg;base64,' + file;
  this.task = this.storage.ref(this.filePath).putString(this.image, 'data_url');

  this.progress = this.task.percentageChanges();
  this.task.percentageChanges().subscribe(res => {
      if ( res === 100) {
        setTimeout(() => {
          // tslint:disable-next-line: max-line-length
          this.imgsrc = 'https://firebasestorage.googleapis.com/v0/b/upload-ec2d4.appspot.com/o/'  + this.filePath +  '?alt=media&';
         // const userphonenumber = this.activeRoute.snapshot.paramMap.get('phone');
          this.userDoc = this.afs.doc<any>('Profile Details/' + this.userphonenumber);
          this.userDoc.update(
       {
        // name: this.username,
         image: this.imgsrc
      });

        }, 8000);
         }
    });
  console.log('https://firebasestorage.googleapis.com/v0/b/upload-ec2d4.appspot.com/o/'  + this.filePath +  '?alt=media&');


}

async uploadHandler() {
 const base64 = await this.captureImage();
 this.createUploadTask(base64);
}

async addimageHandler() {
  const base64 = await this.addImage();
  this.createUploadTask(base64);
 }

 getuser() {
  let user;
  this.afs.doc('Profile Details/' + this.userphonenumber).get().subscribe(( res: any) => {
    if (res.exists) {
      console.log(res.data());
      user = res.data();
      this.uname = user.name;
      this.profileimage = user.image;
    } else {
      this.afs.doc('Profile Details/' + this.userphonenumber).set({
        name: 'Guest',
        image: 'http://www.brayproperties.com/theme/bray/assets/img/person-default.png'
      });
    }
    this.updateimage();
    this.updatename();
  });
}
updateimage() {
  this.afs.doc('Profile Details/' + this.userphonenumber).valueChanges().subscribe(( res: any) => {
   // this.username = res.name;
    this.profileimage = res.image;
  });
}

updatename() {
  this.afs.doc('Profile Details/' + this.userphonenumber).valueChanges().subscribe(( res: any) => {
   // console.log(this.uname);
    this.uname = res.name;
   // this.profileimage = res.image;
  });
}


}
