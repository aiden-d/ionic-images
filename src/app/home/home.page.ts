import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public ngFireAuth: AngularFireAuth, private router: Router,) { }
  async ngOnInit() {
    var user = await this.ngFireAuth.currentUser;
    if (user == null) {
      this.router.navigate(['/login']);
    }





  }


}
