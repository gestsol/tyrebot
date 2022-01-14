import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehiclesFlowService } from './vehicles-flow.service';

@Component({
  selector: 'app-vehicles-flow',
  template: '<router-outlet></router-outlet>',
  styles: ['']
})
export class VehiclesFlowComponent implements OnInit {
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private flowService: VehiclesFlowService
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.route.params.subscribe((params) => {
      if (params['id']) {
        const id = parseInt(params['id'])
        this.flowService.prepareFlow(id).subscribe(() => {
          this.loading = false;
        }, (err) => {
          console.error(err)
          this.loading = false;
        })
      } else {
        this.flowService.loadData()
      }
    })
  }
}
