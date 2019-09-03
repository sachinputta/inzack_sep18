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
      {path : ':journeyid', loadChildren: './viewjourney/viewjourney.module#ViewjourneyPageModule' }
    ]
  },
  // { path: 'chats', loadChildren: './chats/chats.module#ChatsPageModule' },
  { path: 'chats',
  children: [
    {path : ':userid', loadChildren: './chats/chats.module#ChatsPageModule' }
  ]
},
 // { path: 'profile-details', loadChildren: './profile-details/profile-details.module#ProfileDetailsPageModule' },
 { path: 'profile-details/:phone', loadChildren: './profile-details/profile-details.module#ProfileDetailsPageModule' },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
