import { Component, ComponentFactoryResolver, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-accounts-detail',
  templateUrl: './manage-accounts-detail.component.html',
  styleUrls: ['./manage-accounts-detail.component.scss']
})
export class ManageAccountsDetailComponent implements OnInit {
  loading = false;
  loadingUpdate = 0;
  user: User | null = null
  id = 0

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    moment.locale('es')
    this.loading = true
    this.id = this.route.snapshot.params['id']
    this.userService.getOne(this.id).subscribe((user) => {
      const date = user.last_login?
        moment(user.last_login, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm:ss [del] DD [de] MMMM[,] YYYY'):
        'Sin datos de conexión';
      user.last_login = date
      this.user = user;
      this.loading = false;
    }, (err) => {
      console.error(err);
      this.loading = false
    })
  }

  updateUser(active) {
    if (this.user && this.id && !this.loadingUpdate) {
      this.loadingUpdate = active? 1: 2
      this.userService.update({active}, this.id).subscribe((response) => {
        this.user = response
        this.showNotification()
        this.loadingUpdate = 0
      },(err) => {
        console.error(err)
        this.loadingUpdate = 0
      })
    }
  }

  showNotification () {
    this.dialog.open(UpdateNotifier, {
      width: '30vw',
      maxWidth: 648,
      minWidth: 300,
      panelClass: 'custom-dialog',
      disableClose: true
    });
  }
}

@Component({
  template: `
  <div class="dialog">
    <img src="/assets/img/Artboard 1.png" alt="">
    <h1 class="dialog__title">
      El usuario se actualizó correctamente
    </h1>
    <button class="form-btn" mat-dialog-close>
      <span>Continuar</span>
    </button>
  </div>
  `
})
export class UpdateNotifier {
  constructor() {}
}
