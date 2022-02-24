import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface User {
  id?: number
  active: boolean
  email: string
  last_login: string
  name: string
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<{data: Required<User>[]}>('users').pipe(
      map(({data}) => data)
    )
  }

  getOne(id: number) {
    return this.http.get<{data: User}>(`users/${id}`).pipe(
      map(({data}) => data)
    )
  }

  update(user: Partial<User>, id: number) {
    return this.http.put<{data: User}>(`users/${id}`, {user}).pipe(
      map(({data}) => data)
    )
  }
}
