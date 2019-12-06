import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MemberComponent } from './member/member.component';

var config = {
  apiKey: "AIzaSyCFWrpCfBINRtcTsy-vn-cwTrEnSzOk9Nk",
  authDomain: "english-education-dfbe3.firebaseapp.com",
  databaseURL: "https://english-education-dfbe3.firebaseio.com",
  projectId: "english-education-dfbe3",
  storageBucket: "english-education-dfbe3.appspot.com",
  messagingSenderId: "943295561325",
  appId: "1:943295561325:web:b7e870e16d94220ecc4964",
  measurementId: "G-GQFFBMJ3VT"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
