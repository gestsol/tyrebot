import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company, CompanyService } from 'src/app/services/company.service';

export enum AjaxDialogResult {
  success = 1,
  error = 2,
  close = 3
}

@Component({
  selector: 'app-manage-companies-detail',
  templateUrl: './manage-companies-detail.component.html',
  styleUrls: ['./manage-companies-detail.component.scss']
})
export class ManageCompaniesDetailComponent implements OnInit {
  loading = false;
  form = this.fb.group({
    name: ['', Validators.required]
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Required<Company>,
    public dialogRef: MatDialogRef<ManageCompaniesDetailComponent>,
    private companyService: CompanyService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.get('name')?.setValue(this.data.name)
  }

  submit() {
    this.loading = true
    const name = this.form.get('name')?.value;
    this.companyService.update({name}, this.data.id).subscribe(() => {
      this.loading = true
      this.close(AjaxDialogResult.success)
    }, (err) => {
      this.loading = true
      console.error(err)
      this.close(AjaxDialogResult.error)
    })
  }

  close(result: AjaxDialogResult = AjaxDialogResult.close) {
    this.dialogRef.close(result);
  }
}
