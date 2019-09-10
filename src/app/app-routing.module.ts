import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  // { path: 'viewjourney', loadChildren: './viewjourney/viewjourney.module#ViewjourneyPageModule' },
  { path: 'viewjourney',
    children: [
      {path : ':journeyid/:purpose', loadChildren: './viewjourney/viewjourney.module#ViewjourneyPageModule' }
    ]
  },
  // { path: 'chats', loadChildren: './chats/chats.module#ChatsPageModule' },
  { path: 'chats',
  children: [
    {path : ':userid/:journeyid/:purposeid', loadChildren: './chats/chats.module#ChatsPageModule' }
  ]
},
 // { path: 'profile-details/:phone', loadChildren: './profile-details/profile-details.module#ProfileDetailsPageModule' },
  { path: 'chatroom/:chatdocument', loadChildren: './chatroom/chatroom.module#ChatroomPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'editprofile/:phone', loadChildren: './editprofile/editprofile.module#EditprofilePageModule' },
//  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
