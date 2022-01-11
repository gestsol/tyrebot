import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-replacement',
  templateUrl: './replacement.component.html',
  styleUrls: ['./replacement.component.scss']
})
export class ReplacementComponent implements OnInit {
  @Input() type: number = 1;
  @Input() state: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
