import { Component, Input, OnInit } from '@angular/core';
import { Step2 } from 'src/app/services/vehicle.service';

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
