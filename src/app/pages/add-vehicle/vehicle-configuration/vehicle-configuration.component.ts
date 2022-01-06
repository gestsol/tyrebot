import { Component, OnInit, AfterViewInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { EjeData, FlowData, VehicleService } from '../vehicle.service';
import { VehicleConfigurationFormComponent } from './vehicle-configuration-form/vehicle-configuration-form.component';

@Component({
  selector: 'app-vehicle-configuration',
  templateUrl: './vehicle-configuration.component.html',
  styleUrls: ['./vehicle-configuration.component.scss']
})
export class VehicleConfigurationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(VehicleConfigurationFormComponent) items!: QueryList<VehicleConfigurationFormComponent>;

  formValidation: Subscription | null = null
  statusList: Observable<any>[] = []
  isFormValid = false
  ejes: Partial<EjeData>[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.vehicleService.data$.subscribe((value: FlowData) => {
      const step2 = value?.step2
      if (step2) {
        const tiresList = step2.ejes
        const actualData = value.step3? value.step3.ejes : {}
        this.ejes = tiresList.map(value => ({
          tires: value,
          ...actualData
        }))
      }
    })
  }

  back() {
	  this.router.navigate(['/add-vehicle/step-2'])
  }

  continue() {
    this.router.navigate(['../step-4'], {
      relativeTo: this.route
    })
  }

  ngAfterViewInit(): void {
    if (this.formValidation !== null) {
      this.formValidation.unsubscribe()
    }
    this.items.forEach((item, i) => {
      this.statusList.push(item.statusChanges)
    })
    this.formValidation = combineLatest(this.statusList).subscribe((statusList) => {
      this.isFormValid = statusList.reduce((result, value) =>
        result && value === 'VALID',
        true
      )
      console.log(this.isFormValid, statusList)
    })
  }

  ngOnDestroy(): void {
    this.formValidation?.unsubscribe()
  }
}
