import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // メールアドレス入力エラー
  emailError: string;
  // パスワード入力エラー
  passwordError: string;
  // パスワード（確認用）入力エラー
  confirmedPasswordError: string;
  // 会員登録フォーム
  signupForm: FormGroup;
  // 入力結果表示用
  result: string;
  // 登録するボタン押下制御用
  isDisable: boolean;

  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      // メールアドレス
      email: new FormControl(''),
      // パスワード
      password: new FormControl(''),
      // パスワード確認用
      confirmedPassword: new FormControl('')
    });
    this.result = "";
    // 初期遷移時、登録するボタンは押下不可
    this.isDisable = true;
    this.emailError = "";
  }

  /*
   会員登録を行う
  */
  signUp(){
    this.result = JSON.stringify(this.signupForm.value);
  }

  /*
   フォーカスアウト時に、入力されたメールアドレスの入力チェックを行う
   以下の3点のチェックを行う
   1)メールアドレスが空かどうか
   2)メールアドレスが100文字以下かどうか
   3)メールアドレスの形式となっているか
  */
  onCheckEmail(email: string){
    this.emailError = "";
    const emailRegex =  /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    // メールアドレスが空である場合
    if(email == null || email == "")
      this.emailError = "メールアドレスは必須項目です。";
    // メールアドレスの入力文字数が100文字を超える場合
    else if(email.length > 100)
      this.emailError = "メールアドレスは100文字以下で入力してください。"
    // メールアドレスにメールアドレス形式以外が入力された場合
    else if(!emailRegex.test(email))
      this.emailError = "メールアドレスを入力してください。";
    
    // 登録するボタンの押下制御を行う
    this.validate();
  }

  /*
   フォーカスアウト時に、入力されたパスワードの入力チェックを行う
   以下の5点のチェックを行う
   1)パスワードが空かどうか
   2)パスワードが8文字以上かどうか
   3)パスワードが100文字以下かどうか
   4)半角英数で入力されているかどうか
   5)パスワードとパスワード（確認用）が一致しているかどうか
  */
  onCheckPassword(password: string){
    this.passwordError = "";
    const passwordRegex = /^[0-9a-zA-Z]*$/;
    // パスワードが空である場合
    if(password == null || password == "")
      this.passwordError = "パスワードは必須項目です。";
    // パスワードの文字数が8文字よりも小さい場合
    else if(password.length < 8)
      this.passwordError = "パスワードは8文字以上で入力してください。"
    // パスワードの文字数が100文字よりも大きい場合
    else if(password.length > 100)
      this.passwordError = "パスワードは100文字以下で入力してください。"
    // パスワードに半角英数字以外が入力されている場合
    else if(!passwordRegex.test(password))
      this.passwordError = "パスワードは半角英数字で入力してください。"
    else
      // パスワードとパスワード（確認用）が一致しているかチェックする
      this.checkPasswords();

    // 登録するボタンの押下制御を行う
    this.validate();
  }

  /*
   フォーカスアウト時に、入力されたパスワード（確認用）の入力チェックを行う
   以下の2点のチェックを行う
   1)パスワード（確認用）が空かどうか
   2)パスワードとパスワード（確認用）が一致しているかどうか
  */
  onCheckConfirmedPassword(confirmedPassword: string){
    this.confirmedPasswordError = "";
    // パスワード（確認用）が空である場合
    if(confirmedPassword == null || confirmedPassword =="")
      this.confirmedPasswordError = "パスワード（確認用）は必須項目です。"
    else
      // パスワードとパスワード（確認用）が一致しているかチェックする
      this.checkPasswords();
    
    // 登録するボタンの押下制御を行う
    this.validate();
  }

  /*
   パスワードとパスワード（確認用）が一致しているかどうかチェックを行う
  */
  checkPasswords(){
    // パスワードにすでに他のエラーが存在するまたは、パスワード（確認用）が空である場合、
    // パスワードとパスワード（確認用）の一致チェックは行わない
    if((this.passwordError != ""　&& this.passwordError != "パスワードとパスワード（確認用）は一致しなければなりません。") || this.signupForm.get('confirmedPassword').value == "")
      return;
    
    // パスワードとパスワード（確認用）の値が一致しない場合
    if(this.signupForm.get('password').value != this.signupForm.get('confirmedPassword').value)
      this.passwordError = "パスワードとパスワード（確認用）は一致しなければなりません。";
    // 一致する場合
    else
      this.passwordError = "";
  }

  /*
   登録するボタンの押下制御を行う
  */
  validate(){
    // メールアドレス、パスワード、パスワード（確認用）のうち、いずれにもエラーがない場合
    if(this.emailError == "" && this.passwordError == "" && this.confirmedPasswordError == "")
      // 登録するボタン押下可能
      this.isDisable = false;
    // 上記、いずれかにエラーがある場合
    else
      // 登録するボタン押下不可
      this.isDisable = true;
  }

}
