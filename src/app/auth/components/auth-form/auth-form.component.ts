import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private route:Router,private fb:FormBuilder,public angularFireAuth: AngularFireAuth,private firestore: AngularFirestore,){}
  ngOnInit(): void {
    console.log(this.type)
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
      if(this.isLogin){
        this.login()
      }
      else {
        this.SignUp()
      }
    }
  }
  register1(){
   this.angularFireAuth.createUserWithEmailAndPassword(this.authForm.value.email, this.authForm.value.password)
  .then((result) => {
    if (result && result.user) {
      // Add additional user information to Firestore
      return this.firestore.collection('users').doc(result.user.uid).set({
        accountType: this.type
      });
    } else {
      throw new Error('User is null');
    }
  })
  .then(() => {
    // Redirect to the desired page after successful sign-up
    this.route.navigate(['/dashboard']);
  })
  .catch((error) => {
    console.log('Error signing up:', error);
  });
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
  login() {
    this.angularFireAuth.signInWithEmailAndPassword(this.authForm.value.email, this.authForm.value.password)
      .then((userCredential:any) => {
        // Access the user's account type from Firestore
        this.firestore.collection('users').doc(userCredential.user.uid).get()
          .subscribe((doc:any) => {
            if (doc.exists) {
              const accountType = doc.data().accountType;
              if (accountType === 'instructor') {
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
        console.log('Error logging in:', error);
        // Handle error here, e.g., show an error message to the user
      });
  }

  SignUp() {
     this.angularFireAuth
      .createUserWithEmailAndPassword(this.authForm.value.email, this.authForm.value.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user);
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
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      accountType: this.type
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
