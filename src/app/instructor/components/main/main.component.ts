import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  title:any = "Instructor Dashboard"
  constructor(private route: Router){}
  ngOnInit(): void {
    
  }

  navigateTo(){
    this.route.navigate(['instructor/student',1])
  }

}
