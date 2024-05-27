import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MainService } from '../../services/main.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userInfo:any = {};
  fromheader:boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef
  imageUrl:any
  user_id:any;
  uploadedImageUrl:any;
  file:any
  constructor(private storage: AngularFireStorage,public bsModalRef: BsModalRef,private firestore: AngularFirestore,private mainService: MainService) {
    this.user_id = localStorage.getItem('user_id')
  }

  ngOnInit(): void {
    if (this.fromheader) {
      this.mainService.getUserInfo(this.user_id).subscribe(userInfo=>{
        console.log(userInfo)
        this.userInfo = userInfo;
      })
    }
    
  }
  cancel() {
    this.bsModalRef.hide();
  }
  onFileSelected(event: any) {
    console.log('in the dil....')
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result; // Update image URL with the selected file data
    };
    this.file = event.target.files[0]
    reader.readAsDataURL(event.target.files[0]); // Read the selected file as data URL
    this.imageUrl = this.mainService.uploadImage(event.target.files[0],this.user_id)
  }

  uploadImage() {
    const filePath = 'images/' + this.file.name;
    const task = this.storage.upload(filePath, this.file);

    task.snapshotChanges().subscribe({
      complete: () => {
        this.storage.ref(filePath).getDownloadURL().subscribe({
          next: (downloadURL) => {
            this.uploadedImageUrl = downloadURL;
          },
          error: (error) => {
            console.error('Error getting download URL: ', error);
          }
        });
      },
      error: (error) => {
        console.error('Error uploading file: ', error);
      }
    });
  }
  updateImage() {
    // Optional logic based on "fromheader" flag
    if (this.fromheader) {
      this.fileInput.nativeElement.click();
    } else {
       // Trigger the hidden file input click
    }
  }

  // getUserInfo(){
  //   this.firestore.collection('users').doc(this.user_id).valueChanges().subscribe(profile => {
  //     this.userInfo = profile;
  //   });
  // }
  update() {
    // Get the form data and update the user info in Firestore
    if(this.file) {
      this.uploadImage();
    }
    const formData = this.userInfo;
    if (this.uploadedImageUrl) {
      formData.imageUrl = this.uploadedImageUrl;
    }
    this.mainService.updateUserInfo(this.user_id, formData).then(() => {
      console.log('Profile updated successfully!');
    });
  }
}
