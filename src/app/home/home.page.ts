import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Memory } from '../models/memory';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedImage: File = null;
  memText: string = "";
  userEmail: string = "";
  showProgress: boolean = false;
  imageUrl: string = "*";

  memories: Memory[];


  constructor(public ngFireAuth: AngularFireAuth, private router: Router, private ngStorage: AngularFireStorage, private ngFirestore: AngularFirestore, route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.init();
    });
  }
  async init() {
    this.memories = [];
    var user = await this.ngFireAuth.currentUser;
    if (user == null) {
      this.router.navigate(['/login']);
    }
    this.userEmail = user.email;


    await this.ngFirestore.firestore.collection(this.userEmail).orderBy("date").get().then((snapshot) => {
      snapshot.docs.forEach(async doc => {
        var data = doc.data();
        var url = await this.ngStorage.storage.ref(data["imagePath"]).getDownloadURL();
        if (this.memories == null) {
          this.memories = [{ imageUrl: url, memText: data["memText"] }]
        }
        else {
          this.memories.push({ imageUrl: url, memText: data["memText"] });
        }
      })
    })

  }
  async createNewMemory() {
    if (this.showProgress == true) {
      alert("Please wait until previous task is complete!")
      return;
    }

    this.showProgress = true;


    var _selectedImage: File = this.selectedImage;
    var _memText: string = this.memText;




    this.showProgress = true;
    try {
      var date = Date.now();
      const ext = _selectedImage.type.substring(6, _selectedImage.type.length);
      const filePath = this.userEmail + "/" + date.toString() + "." + ext;
      console.log(filePath);
      const fileRef = this.ngStorage.ref(filePath);
      const task = await this.ngStorage.upload(filePath, _selectedImage);
      await this.ngFirestore.firestore.collection(this.userEmail).add({ "imagePath": filePath, "memText": _memText, "date": date });
      alert("Successfully Uploaded");
      this.init();

    }
    catch (e) {
      alert("There was an error: " + e);
    }



    this.showProgress = false;






  }
  onImageSelected(data) {
    const file = data.target.files[0];
    this.selectedImage = file;



  }


}
