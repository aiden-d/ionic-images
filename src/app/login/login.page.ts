import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    email: '',
    password: '',
  }

  constructor(private router: Router, public ngFireAuth: AngularFireAuth, public ngFirestore: AngularFirestore) { }

  ngOnInit() {
  }
  async login() {
    try {
      const user = await this.ngFireAuth.signInWithEmailAndPassword(this.user.email, this.user.password);

    }
    catch (e) {
      alert(e);
      return;
    }

    this.router.navigate(['/home']);


  }
  async register() {
    try {
      const user = await this.ngFireAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);

    }
    catch (e) {
      alert(e);
      return;
    }
    alert("Registration Successful")


  }

}
