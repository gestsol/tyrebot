import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface SuccessDialogData {
  type: 'update' | 'create';
}

@Component({
  selector: 'app-vehicle-creation-success',
  templateUrl: './vehicle-creation-success.component.html',
  styleUrls: ['./vehicle-creation-success.component.scss']
})
export class VehicleCreationSuccessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SuccessDialogData) {}

  ngOnInit(): void {
  }

}
