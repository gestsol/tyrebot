import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { combineLatest } from 'rxjs';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  form = this.fb.group({
    plate: [''],
    from: [''],
    to: ['']
  })

  constructor(
    public dialogRef: MatDialogRef<SearchComponent>,
    private filterService: FiltersService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    combineLatest([this.filterService.plate$, this.filterService.date$])
    .subscribe(([plate, dates]) => {
      console.log('open')
      this.form.setValue({
        plate,
        from: dates.from,
        to: dates.to
      })
    })
  }

  submit() {
    const plate = this.form.get('plate')?.value;
    const from = this.form.get('from')?.value
    const to = this.form.get('to')?.value

    if (from && to) {
      const date = {
        from: moment(from).format(),
        to: moment(to)
        .set('h', 23)
        .set('minutes', 59)
        .set('seconds', 59)
        .format()
      }
      this.filterService.setDate(date)
    }

    this.filterService.setPlate(plate);
    this.close()
  }

  close() {
    this.dialogRef.close();
  }
}
