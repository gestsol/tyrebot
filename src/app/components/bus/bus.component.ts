import { Component, Input, OnInit } from '@angular/core';
import { Step2 } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent implements OnInit {
  @Input() data: Step2 = { ejes: [0] }
  repuestoLength: string[] = []

  constructor() { }

  ngOnInit(): void {
    this.repuestoLength = new Array(this.data.ejes[this.data.ejes.length - 1]).fill('')
  }

}
