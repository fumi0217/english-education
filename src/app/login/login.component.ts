import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // 画面表示メッセージ
  message: string;
  // 入力結果表示用
  result: string;
  // ログインフォーム
  loginForm: FormGroup;
  // メールアドレス入力エラー
  emailError: string;
  // パスワード入力エラー
  passwordError: string;
  // ログインするボタン押下制御用
  isDisable: boolean;

  constructor(private db: AngularFirestore, private router: Router) { }

  ngOnInit() {
    this.message = "メールアドレスとパスワードを入力してください。";
    this.loginForm = new FormGroup({
      // メールアドレス
      email: new FormControl(''),
      // パスワード
      password: new FormControl('')
    });
    // 初期遷移時、ログインするボタンは押下不可
    this.isDisable = true;
  }

  /*
   ログインする
  */
  login(email: string, password: string){
    // 入力された登録内容（メアドとパスワード）を取得する
    const data = {
      mail: email,
      password: password
    }

    // firestoreに入力内容（メールアドレス、パスワード）が一致するものがあるかどうかを問い合わせる
    // メールアドレスが同一のものを検索する
    this.db.collection('users', ref => ref.where('mail', '==', data.mail))
      .get()
      .subscribe(users => {
        const user = users.docs.pop();
        // メールアドレスが一致する（firestoreではメールアドレスは一意であるため）かつ、
        // パスワードが一致する場合
        if(users.size == 1 && user.data().password ==　data.password){
          // 会員ページに遷移する
          this.router.navigate(['/member']);   
        }else{
          // メールアドレス、もしくはパスワードが一致しなかった場合
          this.result = "入力したメールアドレス、もしくはパスワードに誤りがあります。";
        }
      },
      // firestoreへの問い合わせにて、エラーが発生した場合
      error => {
        this.result = "エラー発生！"
      });
  }

  /*
   フォーカスアウト時に、入力されたメールアドレスの入力チェックを行う
   以下のチェックを行う
   1)メールアドレスが空かどうか
  */
  onCheckEmail(email: string){
    if(email == null || email == "")
      this.emailError = "メールアドレスを入力してください。";
    else
      this.emailError = "";

    // ログインするボタンの押下制御を行う
    this.validate();
  }

  /*
   フォーカスアウト時に、入力されたパスワードの入力チェックを行う
   以下のチェックを行う
   1)パスワードが空かどうか
  */
  onCheckPassword(password: string){
    if(password == null || password == "")
      this.passwordError = "パスワードを入力してください。";
    else
      this.passwordError = "";

    // ログインするボタンの押下制御を行う
    this.validate();
 }

  /*
   ログインするボタンの押下制御を行う
  */
 validate(){
  // メールアドレス、パスワードのうち、いずれにもエラーがない場合
  if(this.emailError == "" && this.passwordError == "")
    // ログインするボタン押下可能
    this.isDisable = false;
  // 上記、いずれかにエラーがある場合
  else
    // ログインするボタン押下不可
    this.isDisable = true;
}

}
