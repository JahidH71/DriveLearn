import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import * as L from 'leaflet';
@Component({
  selector: 'app-lesson-scheduling',
  templateUrl: './lesson-scheduling.component.html',
  styleUrls: ['./lesson-scheduling.component.css']
})
export class LessonSchedulingComponent implements OnInit {
  title:any = "Drive-Learn";
  newDateTime: any = new Date;
  newDate: any = new Date();
  newTime: any = new Date();
  // private map!: L.Map;
  @ViewChild('map', {static: true}) mapContainer!: ElementRef;
  constructor() {
    const today = new Date();
    this.newDate = today.toISOString().slice(0, 10); // Format: YYYY-MM-DD
    this.newTime = today.toTimeString().slice(0, 5); // Format: HH:MM
    this.newDateTime = this.getCurrentDateTimeString();
  }
  ngOnInit(): void {
    // this.initMap()
  }
  private getCurrentDateTimeString(): string {
    // Get current date and time in ISO 8601 format
    const now = new Date();
    return now.toISOString().slice(0, 16);
  }
//   initMap(): void {
//     // Initialize the map with default options
//     this.map = L.map('map').setView([0, 0], 2); // Default center and zoom level

//     // Add tile layer
//     const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 18,
//         minZoom: 2,
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     });
//     tiles.addTo(this.map);
// }
}
