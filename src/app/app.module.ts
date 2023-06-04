import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { apiBaseUrl } from './api-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: apiBaseUrl, useValue: apiBaseUrl},
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
