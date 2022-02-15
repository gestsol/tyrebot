import { Component, HostListener, Input, OnInit } from '@angular/core';

export interface BusAxies {
  type: 'main' | 'backup',
  tyres_count: number,
  axie_number: number,
  tyres: {
    tyre_number: number,
    state: string
  }[]
}

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent implements OnInit {
  @Input() axies: BusAxies[] = []
  img = '/assets/img/bus/bus.svg'

  constructor() { }

  ngOnInit(): void {
    this.selectImg()
  }

  @HostListener('window:resize', ['$event'])
  resize() {
    this.selectImg()
  }

  selectImg () {
    if (window.innerWidth < 700) {
      this.img = '/assets/img/bus/bus-mobile2.png'
    } else {
      this.img = '/assets/img/bus/bus.svg'
    }
  }

}
