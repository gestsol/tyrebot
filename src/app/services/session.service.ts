import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InterceptorError } from 'src/app/intereptors/commonOptions';

export const TOKEN_NAME = 'tyrebot-token'

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string) {
    const user = {email, password}
    return this.http.post<{access_token: string}>('login', {user}).pipe(
      map(({access_token}) => {
        localStorage.setItem(TOKEN_NAME, access_token)
        return access_token
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
