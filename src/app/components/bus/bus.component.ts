import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent implements OnInit {
  @Input() axies: any
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
    console.log(window.innerWidth)
    if (window.innerWidth < 700) {
      this.img = '/assets/img/bus/bus-mobile2.png'
    } else {
      this.img = '/assets/img/bus/bus.svg'
    }
  }

}
