import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { OffersComponent } from './offers/offers.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { BandComponent } from './band/band.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';


const routes: Routes = [
  {
    path: 'offers',
    component: OffersComponent
  },
  {
    path: '',
    component: GuestPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'about',
    component: AboutMeComponent
  },
  {
    path: 'profile',
    component: UserPanelComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'myband',
    component: BandComponent
  },
  {
    path: 'admin',
    component: AdminPanelComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
