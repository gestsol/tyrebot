import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InterceptorError } from 'src/app/intereptors/commonOptions';
import { User, UserService } from './user.service';

export const TOKEN_NAME = 'tyrebot-token'

export enum Roles {
  Master = 1,
  Admin = 2,
  Standart = 3
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  login(email: string, password: string) {
    const user = {email, password}
    return this.http.post<{access_token: string}>('login', {user}).pipe(
      map(({access_token}) => {
        localStorage.setItem(TOKEN_NAME, access_token)
      }),
      catchError((error: InterceptorError) => {
        let message = error.defaultMessage;
        if (error.status === 401) {
          message = 'Correo o contraseña inconrrectos';
        }
        return throwError(message);
      }),
    )
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME)
    this.router.navigate(['join', 'login'])
  }
}
