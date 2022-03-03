import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company, CompanyService } from 'src/app/services/company.service';
import { Roles } from 'src/app/services/session.service';
import { User, UserService } from 'src/app/services/user.service';
import { AjaxDialogAction, AjaxDialogResult, MainService } from '../../main/main.service';

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
  actualUser: User | null = null
  loading = false;
  options: Company[] = []
  roleOptions = [
    {
      name: 'Administrador',
      id: Roles.Admin
    },
    {
      name: 'Estandar',
      id: Roles.Standart
    }
  ]
  matcher = new MyErrorStateMatcher();
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    company_id: [null, Validators.required],
    active: [false]
  })

  canModifyRole = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<User> & {action: AjaxDialogAction},
    public dialogRef: MatDialogRef<ManageAccountsDetailComponent>,
    private userService: UserService,
    private companyService: CompanyService,
    private mainService: MainService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.companyService.companies$.subscribe((list) => {
      this.options = list
    })
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
    this.mainService.actualUser$.subscribe((actualUser) => {
      console.log(actualUser)
      this.actualUser = actualUser
      if (actualUser?.role === Roles.Master) {
        if (
          this.data.action === AjaxDialogAction.update &&
          this.data.role &&
          actualUser.role < this.data.role
          ) {
          this.createRoleControl()
        } else if (this.data.action === AjaxDialogAction.create) {
          this.createRoleControl()
        }
      }
    })
  }

  private createRoleControl () {
    this.canModifyRole = true
    this.addControls('role', this.data.role || Roles.Standart, true)
  }

  private addControls(name: string, value: any = '', required = false) {
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
      active: this.form.get('active')?.value,
      role: this.data.role || Roles.Standart
    };

    if (this.canModifyRole) {
      user.role = this.form.get('role')?.value
    }

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
}
