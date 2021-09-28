import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name : string = "avenGErs";
  amount : number = 6666.345;

  dataOfBirth = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
