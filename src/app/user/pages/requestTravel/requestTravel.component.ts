import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-request-travel',
  templateUrl: './requestTravel.component.html',
  styleUrls: ['./requestTravel.component.scss'],
})
export class RequestTravelComponent implements OnInit {
  loading: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
