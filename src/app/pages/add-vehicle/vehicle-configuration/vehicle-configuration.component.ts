import { Component, OnInit, AfterViewInit, OnDestroy, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { EjeData, FlowData, Step3, StepKeys, VehicleService } from '../../../services/vehicle.service';
import { VehicleConfigurationFormComponent } from './vehicle-configuration-form/vehicle-configuration-form.component';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-vehicle-configuration',
  templateUrl: './vehicle-configuration.component.html',
  styleUrls: ['./vehicle-configuration.component.scss']
})
export class VehicleConfigurationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
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
        const actualData = value.step3 ? value.step3.ejes : []
        console.log(tiresList)
        console.log(actualData)
        this.ejes = tiresList.map((value, i) => ({
          ...actualData[i],
          tires: value
        }))
      }
    })
  }

  back() {
	  this.router.navigate(['/add-vehicle/step-2'])
  }

  continue() {
    const ejes: EjeData[] = []
    this.items.forEach(item => {
      ejes.push(item.getData())
    })
    const data: Step3 = {
      ejes
    }

    this.vehicleService.updateStep(data, StepKeys.step3)

    this.router.navigate(['../step-4'], {
      relativeTo: this.route
    })
  }

  ngAfterViewInit(): void {
    this.items.forEach((item, i) => {
      this.statusList.push(item.statusChanges)
    })
    this.formValidation = combineLatest(this.statusList).subscribe((statusList) => {
      setTimeout(() => {
        this.isFormValid = statusList.reduce((result, value) =>
          result && value === 'VALID',
          true
        )
      },0)
    })

    this.route.queryParams.subscribe(
		  params => {
			  const eje =  parseInt(params['eje']);
        if (eje) {
          this.tabGroup.selectedIndex = eje
        }
		  }
		)
  }

  ngOnDestroy(): void {
    this.formValidation?.unsubscribe()
  }
}
