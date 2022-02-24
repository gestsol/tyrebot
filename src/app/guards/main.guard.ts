import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TOKEN_NAME } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let canActivate = false
      const token = localStorage.getItem(TOKEN_NAME)
      if (token != null) {
        const tokenDeserialized = JSON.parse(atob(token.split('.')[1]))
        const expiry = tokenDeserialized.exp;
        const actualDate = Math.floor((new Date()).getTime()/1000)
        canActivate = expiry > actualDate
      }
      if (!canActivate) {
        localStorage.removeItem('token')
        this.router.navigate(['join', 'login']);
        localStorage.removeItem('data')
      }
      return canActivate;
  }

}
