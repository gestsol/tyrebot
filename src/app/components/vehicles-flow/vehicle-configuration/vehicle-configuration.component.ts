import { Component, OnInit, AfterViewInit, OnDestroy, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { VehiclesFlowService, EjeData, FlowData, Step3, StepKeys } from '../vehicles-flow.service';
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

  formValidation: Subscription | null = null;
  tpmsValidation: Subscription | null = null;
  statusList: Observable<any>[] = [];
  tpmsList: Observable<any>[] = [];
  isFormValid = false;
  ejes: Partial<EjeData>[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flowService: VehiclesFlowService
  ) { }

  ngOnInit(): void {
    this.flowService.data$.subscribe((value: FlowData) => {
      const step2 = value?.step2
      if (step2) {
        const tiresList = step2.ejes
        const actualData = value.step3 ? value.step3.ejes : []
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
    const step: Step3 = {
      ejes
    }

    this.route.params.subscribe((params) => {
      this.flowService.updateStep(step, StepKeys.step3, !params['id'])
    })

    this.router.navigate(['../step-3'], {
      relativeTo: this.route
    })
  }

  ngAfterViewInit(): void {
    this.items.forEach((item, i) => {
      this.statusList.push(item.statusChanges)
      this.tpmsList.push(item.tpmsNameChanges)
    })
    this.formValidation = combineLatest(this.statusList).subscribe((statusList) => {
      setTimeout(() => {
        this.isFormValid = statusList.reduce((result, value) =>
          result && value === 'VALID',
          true
        )
      },0)
    })
    this.tpmsValidation = combineLatest(this.tpmsList).subscribe((valueList) => {
      setTimeout(() => {
        let flattenedList: any[] = []
        valueList.forEach((item: any[]) =>
          flattenedList = [
            ...flattenedList,
            ...item
          ]
        )
        let initialIndex = 0
        this.items.forEach((axie, i) => {
          axie.tpms_name.controls.forEach((control, j) => {
            const tyreIndex = j + initialIndex
            if (control.value !== '') {
              const present = flattenedList.some((item, index) => control.value === item && index !== tyreIndex)
              if (present)
                control.setErrors({
                  notUnique: 'TPMS id debe ser único'
                })
              else
                control.setErrors(null)
            }
          })
          initialIndex += axie.tpms_name.controls.length
        })
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
    this.tpmsValidation?.unsubscribe()
  }
}
