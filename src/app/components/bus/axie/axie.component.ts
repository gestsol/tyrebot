import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-axie',
  templateUrl: './axie.component.html',
  styleUrls: ['./axie.component.scss']
})
export class AxieComponent implements OnInit {
  @Input() axie = 1
  @Input() type = 2
  @Input() tyres: any[] = []
  classes = ''

  constructor() { }

  ngOnInit(): void {
    this.classes = this.tyres.map((item, i) => item.state? `${item.state}-${i + 1}`: '').join(' ')
  }

}
