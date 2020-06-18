import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { AsideMenuMobileComponent } from './aside-menu-mobile/aside-menu-mobile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AboutMeComponent } from './about-me/about-me.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { OffersComponent } from './offers/offers.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
// import { MatRippleModule } from '@angular/material/core/ripple';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { PasswordPipe } from './pipe';
import { AijoComponent } from './offers/aijo/aijo.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { BandComponent } from './band/band.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

// import { MatButtonModule,
//   MatFormFieldModule,
//   MatInputModule,
//   MatRippleModule} from '@angular/material'

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GuestPageComponent,
    AsideMenuMobileComponent,
    LoginComponent,
    RegisterComponent,
    AboutMeComponent,
    UserPanelComponent,
    OffersComponent,
    PasswordPipe,
    AijoComponent,
    ScheduleComponent,
    BandComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    modules,
    FormsModule
  ],
  exports: [
    modules
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
