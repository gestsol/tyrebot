import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { User, UserService } from 'src/app/services/user.service';
import { AjaxDialogAction, AjaxDialogResult } from '../../main/main.service';

const passworfValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repeat_password = control.get('repeat_password');

  return password && repeat_password && password.value !== repeat_password.value ? { notEqual: true } : null;
};
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    return !!(control?.parent?.errors?.notEqual && control?.dirty);
  }
}
@Component({
  selector: 'app-manage-accounts-detail',
  templateUrl: './manage-accounts-detail.component.html',
  styleUrls: ['./manage-accounts-detail.component.scss']
})
export class ManageAccountsDetailComponent implements OnInit {
  loading = false;
  options = this.companyService.companies$

  matcher = new MyErrorStateMatcher();
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    company_id: [null, Validators.required],
    active: [false]
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<User> & {action: AjaxDialogAction},
    public dialogRef: MatDialogRef<ManageAccountsDetailComponent>,
    private userService: UserService,
    private companyService: CompanyService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.form.get('name')?.setValue(this.data.name)
    this.form.get('email')?.setValue(this.data.email)
    this.form.get('username')?.setValue(this.data.username)
    this.form.get('company_id')?.setValue(this.data.company_id)
    this.form.get('active')?.setValue(this.data.active)
    if (this.data.action === AjaxDialogAction.create) {
      this.addControls('password', '', true)
      this.addControls('repeat_password', '', true)
      this.form.addValidators(passworfValidator)
    }
  }

  private addControls(name: string, value = '', required = false) {
    const control = new FormControl(value, required ? [
      Validators.required
    ] : undefined)
    this.form.addControl(name, control)
  }

  submit() {
    this.loading = true
    const user: User & {password?: string} = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      username: this.form.get('username')?.value,
      company_id: this.form.get('company_id')?.value,
      active: this.form.get('active')?.value
    };

    if (this.data.action === AjaxDialogAction.create) {
      user.password = this.form.get('password')?.value
    }

    if (this.data.action === AjaxDialogAction.update && this.data.id) {
      this.userService.update(user, this.data.id).subscribe(() => {
        this.loading = true
        this.close(AjaxDialogResult.success)
      }, (err) => {
        this.loading = true
        console.error(err)
        this.close(AjaxDialogResult.error)
      })
    } else if (this.data.action === AjaxDialogAction.create) {
      this.userService.create(user).subscribe(() => {
        this.loading = true
        this.close(AjaxDialogResult.success)
      }, (err) => {
        this.loading = true
        console.error(err)
        this.close(AjaxDialogResult.error)
      })
    }
  }

  close(result: AjaxDialogResult = AjaxDialogResult.close) {
    this.dialogRef.close(result);
  }

  compareOptions(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }
}
