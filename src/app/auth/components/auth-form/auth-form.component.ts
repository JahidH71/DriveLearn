import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent implements OnInit{
  @Input() type:any;
  authForm!: FormGroup
  constructor(private route:Router,private fb:FormBuilder,public angularFireAuth: AngularFireAuth){}
  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]]
    })
  }
  navigate(){
    if(this.type)
      this.route.navigate(['/login'])
    else
      this.route.navigate(['/register'])
  }
  onSubmit(){
    if(this.authForm.valid){
      this.register()
    }
  }
  register1(){
    this.angularFireAuth.createUserWithEmailAndPassword(this.authForm.value.email,this.authForm.value.password)
    .then((user:any)=>{
        console.log('user.....',user);
        localStorage.setItem('authToken', user.user.getIdToken());
        console.log('Registration successful:', user);
      }
    )
    .catch((error)=>{
      console.log('errorr....',error)
    })
  }

  register() {
    this.angularFireAuth.createUserWithEmailAndPassword(this.authForm.value.email, this.authForm.value.password)
      .then((userCredential: any) => {
        const user1 = userCredential.user;
  
        // Update user profile with custom claims
        return user1.getIdToken().then((idToken:any) => {
          // Set custom claims
          return this.angularFireAuth.currentUser!.then((user:any) => {
              // Set custom claims for admin users
            user.multiFactor.user.accountType = this.type;
            // Update user profile with custom claims
            return user.getIdToken(true).then(() => {
              this.angularFireAuth.updateCurrentUser
              return this.angularFireAuth.updateCurrentUser(user);
            });
          });
        }).then(() => {
          // Save the token in local storage
          localStorage.setItem('authToken', userCredential.user.getIdToken());
          if(this.type == 1){
            this.route.navigate(['/instructor'])
          }
          else this.route.navigate(['/student'])
          console.log('Registration successful:', user1);
        });
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  }
  login(){
    this.angularFireAuth.signInWithEmailAndPassword(this.authForm.value.email, this.authForm.value.password)
    .then((userProfile:any)=>{
      console.log(userProfile)
      localStorage.setItem('userProfile', userProfile);
      if(this.type == 1){
        this.route.navigate(['/instructor'])
      }
      else this.route.navigate(['/student'])
      }
    )
    .catch((error)=>{

    })
  }
  
}
