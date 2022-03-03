import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { isTokenValid } from '../utils/token';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let canActivate = isTokenValid()
      if (!canActivate) {
        localStorage.removeItem('token')
        this.router.navigate(['join', 'login']);
        localStorage.removeItem('data')
      }
      return canActivate;
  }

}
