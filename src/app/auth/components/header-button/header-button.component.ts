import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.css']
})
export class HeaderButtonComponent {
  accountType:any = 2;
  @Output() typeOfAcount = new EventEmitter<any>

  selectAccountType(type:any){
    this.accountType = type;
    this.typeOfAcount.emit(type)
  }
}
