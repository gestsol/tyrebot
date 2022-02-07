import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { SearchComponent } from 'src/app/components/filters/search/search.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { FiltersService } from './filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  showBackBtn = false;
  @Input() showDate = false
  @Input() showPlate = false
  form = this.fb.group({
    plate: [''],
    from: [''],
    to: [''],
    report: ['']
  })

  constructor(
    private navigationService: NavigationService,
    private filterService: FiltersService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.navigationService.currentUrl$.subscribe((url) => {
      this.showBackBtn = url.includes('detail')
    })

    this.form.get('plate')?.valueChanges.subscribe((value) => {
      this.filterService.setPlate(value)
    })
  }

  dateChange() {
    const from = this.form.get('from')?.value
    const to = this.form.get('to')?.value
    if (from && to) {
      const data = {
        from: moment(this.form.get('from')?.value).format(),
        to: moment(this.form.get('to')?.value)
        .set('h', 23)
        .set('minutes', 59)
        .set('seconds', 59)
        .format()
      }
      this.filterService.setDate(data)
    } else {
      this.form.patchValue({
        ...this.filterService.getDate()
      })
    }
  }

  calendarChange(event) {
    console.log(event)
  }

  openSearchDialog() {
    const dialogRef = this.dialog.open(SearchComponent, {
      width: '80vw',
      minWidth: 300,
      // minHeight: 300,
      panelClass: 'custom-dialog',
      data: {
        showDate: this.showDate,
        showPlate: this.showPlate
      }
    });
  }
}
