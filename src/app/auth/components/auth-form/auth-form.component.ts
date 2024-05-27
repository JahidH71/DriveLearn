import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit{
  @Input() type:any;
  @Input() isLogin:any;
  authForm!: FormGroup
  errorMessage:any;
  constructor(private route:Router,private fb:FormBuilder,public angularFireAuth: AngularFireAuth,private firestore: AngularFirestore,){}
  ngOnInit(): void {
    console.log(this.type)
    if(this.isLogin) {
      this.authForm = this.fb.group({
        email: ['', [Validators.required,Validators.email]],  
        password: ['',[Validators.required,Validators.minLength(5)]]
    })
    }
    else if (this.type == 1) {
      this.authForm = this.fb.group({
        email: ['', [Validators.required,Validators.email]],
        firstName: ['',[Validators.required,Validators.minLength(3)]],
        lastName: ['',[Validators.required,Validators.minLength(3)]],
        mobileNumber: ['',[Validators.required]],
        password: ['',[Validators.required,Validators.minLength(5)]],
        cost: ['',[Validators.required]],
        address: ['',[Validators.required]],
        timing: ['',[Validators.required]]
      })
    }
    else {
      this.authForm = this.fb.group({
        email: ['', [Validators.required,Validators.email]],
        firstName: ['',[Validators.required,Validators.minLength(3)]],
        lastName: ['',[Validators.required,Validators.minLength(3)]],
        mobileNumber: ['',[Validators.required]],
        password: ['',[Validators.required,Validators.minLength(5)]],
      })
    }
    
  }
  navigate(){
    if(this.type)
      this.route.navigate(['/login'])
    else
      this.route.navigate(['/register'])
  }
  onSubmit(){
    if(this.authForm.valid){
      if(this.isLogin){
        this.login()
      }
      else {
        this.SignUp()
      }
    }
  }




  login() {
    this.errorMessage = '';
    this.angularFireAuth.signInWithEmailAndPassword(this.authForm.value.email, this.authForm.value.password)
      .then((userCredential:any) => {
        // Access the user's account type from Firestore
        this.firestore.collection('users').doc(userCredential.user.uid).get()
          .subscribe((doc:any) => {
            if (doc.exists) {
              const accountType = doc.data().accountType;
              localStorage.setItem('authToken', userCredential.user.getIdToken());
              localStorage.setItem('user_id', userCredential.user.uid);
              localStorage.setItem('accountType', accountType);
              if(userCredential.user.teacherId) {
                localStorage.setItem('teacherId', userCredential.user.teacherId);
              }
              if (accountType == 1) {
                this.route.navigate(['/instructor']);
              } else {
                this.route.navigate(['/student']);
              }
            } else {
              console.log('User document does not exist');
              // Handle error here, e.g., show an error message to the user
            }
          });
      })
      .catch((error) => {
        this.errorMessage = 'Your provided Credentials are Wrong or Something went wrong'
        // Handle error here, e.g., show an error message to the user
      });
  }

  SignUp() {
     this.angularFireAuth
      .createUserWithEmailAndPassword(this.authForm.value.email, this.authForm.value.password)
      .then((result) => {
        this.SetUserData(result.user);
        this.route.navigate(['/login'])
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: this.authForm.value.firstName + ' ' + this.authForm.value.lastName,
      first_name: this.authForm.value.firstName,
      last_name: this.authForm.value.lastName,
      mobile_number: this.authForm.value.mobileNumber, 
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      accountType: this.type,
      cost: this.type == 1 ? this.authForm.value.cost : null,
      address: this.type == 1 ? this.authForm.value.address : null,
      timing: this.type == 1 ? this.authForm.value.timing : null,

    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
