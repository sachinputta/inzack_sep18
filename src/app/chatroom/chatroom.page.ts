import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {
  @ViewChild(IonContent, {read: IonContent, static: true}) content: IonContent;
  chatdocs: any;
  text: string;
  chatRef: any;
  uid: string;
  check: any;
  userDoc: any;
  chats: any;
  userInfo: any = {};
  userid: any;
  chatRef1: any;
  userDoc1: any;
  public data: any;
  public dateTime: any = '';
  jid: any;
  profiledetails: any;
  profiledetails1: any;
  // tslint:disable-next-line: variable-name
  prof_data: any;

  constructor(private act: ActivatedRoute, public af: AngularFireAuth, public fs: AngularFirestore) {


    ( window as any).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
      defaultCountryCode: 'IN',
      facebookNotificationsEnabled: true,
    }, data => {
     // this.isUserLoggedIn = true;
      ( window as any).AccountKitPlugin.getAccount( info => {
        this.userInfo = info;
       // console.log(this.userInfo.phoneNumber);
        this.uid = this.userInfo.phoneNumber;
        // console.log(this.uid);
        this.act.paramMap.subscribe(ParamMap => {
          if (!ParamMap.has('chatdocument')) {
          } else {
            this.chatdocs = ParamMap.get('chatdocument');
            console.log(this.chatdocs);
          }
          this.chatRef = this.fs.doc('chats/' + this.chatdocs).valueChanges();
          this.chatRef.subscribe((arg: any) => {
            this.content.scrollToBottom();
            this.chats = arg.chats;

              }
                );
       }, error => console.log(error));
    },
    error => console.log(error)
    );

    });
   }

  ngOnInit() {
  }



  send() {
    this.content.scrollToBottom();
    this.fs.doc('chats/' + this.chatdocs).get().subscribe((response: any) => {
      console.log(response.exists);
      this.check = response.exists;
      this.dateTime = new Date();
      if (this.check) {
       console.log('status');
       this.userDoc = this.fs.doc<any>('chats/' + this.chatdocs);
       this.userDoc.update(
    {
     chats: firebase.firestore.FieldValue.arrayUnion(
       {
       Name: this.uid,
       Message: this.text,
       userID: this.uid,
       Timestamp: this.dateTime
       })
   });
       this.text = '';
       console.log('checked in');
    }
    });
  }

}
