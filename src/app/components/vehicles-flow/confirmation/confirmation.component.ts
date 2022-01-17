import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleCreationSuccessComponent } from '../../vehicle-creation-success/vehicle-creation-success.component';
import { Step1, Step2, Step3, VehiclesFlowService } from '../vehicles-flow.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  step1: Step1 | null = null
  step2: Step2 | null = null
  step3: Step3 | null = null
  axies: any
  ejesLength = 0
  loading = false

  constructor(
    private flowService: VehiclesFlowService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.flowService.data$.subscribe((value) => {
      const { step1, step2, step3 } = value
      if (step1 && step2?.ejes && step3) {
        this.step1 = step1
        this.step2 = step2
        this.step3 = step3
        this.ejesLength = step2.ejes.length
        this.getBus()
      }
    })
  }

  toDetail() {
    this.router.navigate(['../step-1'], {
      relativeTo: this.route
    })
  }

  toEjes() {
    this.router.navigate(['../step-2'], {
      relativeTo: this.route
    })
  }

  toEje(eje: number) {
    this.router.navigate(['../step-3'], {
      relativeTo: this.route,
		  queryParams: {
		   eje: eje
		  }
		});
  }

  getBus() {
    if (this.step1 && this.step3) {
      const ejesLength = this.step3.ejes.length
      this.axies = this.step3.ejes.map((item, index) => ({
        type: index !== ejesLength - 1 ? 'main' : 'backup',
        tyres_count: item.tires,
        axie_number: index + 1,
        tyres: new Array(item.tires).fill({}).map((_, i) => ({
          tyre_number: i + 1
        }))
      }))
    }
  }

  continue() {
    this.loading = true;
    this.route.parent?.parent?.params.subscribe((params) => {
      if (this.step1 && this.step3) {
        if (!params['id']) {
          this.flowService.createData(this.step1, this.step3, () => this.loading = false)
          .subscribe((response) => {
            this.flowService.deleteInfo()
            this.router.navigate(['../../active-vehicle'])
          }, (err) => console.error(err))
        } else {
          this.flowService.updateData(params['id'], this.step1, this.step3, () => this.loading = false)
          .subscribe((response) => {
            this.flowService.deleteInfo()
            this.router.navigate(['../../active-vehicle'])
          }, (err) => console.error(err))
        }
      }
    })
  }

  prepareDialog() {
    if (window.scrollY !== 0) {
      const scrollEvent = () => {
        console.log(window.scrollY)
        if (window.scrollY === 0) {
          this.openDialog()
          window.removeEventListener('scroll', scrollEvent)
        }
      }
      window.addEventListener('scroll', scrollEvent)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      this.openDialog()
    }
    setTimeout(() => {
      this.dialog.closeAll()
    }, 2500)
  }

  openDialog() {
    this.dialog.open(VehicleCreationSuccessComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

}
