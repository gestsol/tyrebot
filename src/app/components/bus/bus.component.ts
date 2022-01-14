import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent implements OnInit {
  @Input() axies: any

  constructor() { }

  ngOnInit(): void {
  }

}
