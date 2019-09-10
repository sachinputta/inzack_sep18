import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
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
  profileimage: any;
  pid: any;

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
          if (!ParamMap.has('userid')) {

          } else {
           // console.log(ParamMap.get('userid'));
           // console.log(ParamMap.get('journeyid'));
            this.userid = ParamMap.get('userid');
            this.jid = ParamMap.get('journeyid');
            this.pid = ParamMap.get('purposeid');
            console.log('journeyid:' + this.jid);
            console.log('userid:' + this.userid);
            console.log('purpose:' + this.pid);
          }
        });

        this.chatRef = this.fs.doc('chats/' + this.jid + '_' + this.userInfo.phoneNumber + '_' + this.userid ).valueChanges();
        this.chatRef.subscribe((arg: any) => {
            this.chats = arg.chats;
          }
            );
        // this.chatRef1 = this.fs.doc('chats/' + this.jid + '_' + this.userid + '_' + this.userInfo.phoneNumber).valueChanges();
        // this.chatRef1.subscribe((arg: any) => {
        //         this.chats = arg.chats;
        //       }
        //         );
       }, error => console.log(error));
    },
    error => console.log(error)
    );

   }

  ngOnInit() {
  }

  send() {
    this.fs.doc('chats/' + this.jid + '_' + this.userInfo.phoneNumber + '_' + this.userid).get().subscribe((response: any) => {
      console.log(response.exists);
      this.check = response.exists;
      this.dateTime = new Date();
      if (this.check) {
       // this.fun();
       console.log('status');
       this.userDoc = this.fs.doc<any>('chats/' + this.jid + '_' + this.userInfo.phoneNumber + '_' + this.userid);
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
//        this.userDoc1 = this.fs.doc<any>('chats/' + this.jid  + '_' +  this.userid + '_' + this.userInfo.phoneNumber);
//        this.userDoc1.update(
// {
//  chats: firebase.firestore.FieldValue.arrayUnion(
//    {
//    Name: this.uid,
//    Message: this.text,
//    userID: this.uid,
//    Timestamp: this.dateTime
//    })
// });

       this.profiledetails = this.fs.doc<any>('Profile Details/'  + this.userInfo.phoneNumber );
       // tslint:disable-next-line: variable-name
      //  const prof_data = this.profiledetails.data();
      //  console.log(prof_data);
       this.profiledetails.update(
        {
         chats: firebase.firestore.FieldValue.arrayUnion(
           {
             chatdocument: this.jid + '_' + this.userInfo.phoneNumber + '_' + this.userid,
             name: this.userid,
             purpose: this.pid
           })
        });
       console.log('profile details');

       this.profiledetails1 = this.fs.doc<any>('Profile Details/'  + this.userid );
       this.profiledetails1.update(
        {
         chats: firebase.firestore.FieldValue.arrayUnion(
           {
             chatdocument: this.jid  + '_' + this.userInfo.phoneNumber + '_' + this.userid,
              name: this.userInfo.phoneNumber,
              purpose: this.pid
           })
        });
       console.log('profile details1');
       this.text = '';
       console.log('checked in');
    } else if (this.userInfo.phoneNumber !== this.userid ) {
      this.fs.doc('chats/' + this.jid + '_' + this.userInfo.phoneNumber + '_' + this.userid).set({
        chats: [ ]
       });
      // this.fs.doc('chats/' + this.jid + '_' + this.userid + '_' + this.userInfo.phoneNumber).set({
      //   chats: [ ]
      //  });
      console.log('checked out');
      } else {
        console.log('unable to chat');
      }
    });
  }

}
