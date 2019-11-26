import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  messages: string[];
  signupForm: FormGroup;
  result: string;
  isDisable: boolean;

  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      passwordConfirmed: new FormControl('')
    });
    this.result = "";
    this.isDisable = true;
    this.messages = [];
  }

  signUp(){
    this.result = JSON.stringify(this.signupForm.value);
  }

  onCheckEmail(email: string){
    if(email == null || email == "")
      this.messages.push("メールアドレスは必須項目です。");
    else if()
      this.messages.push("メールアドレスを入力してください。");
  }

}
