import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  accountType:any = 2;
  typeOfAccount(event:any){
    this.accountType = event
  }
}
