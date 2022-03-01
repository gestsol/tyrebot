import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CompanyService } from './company.service';

export interface User {
  id?: number
  active: boolean
  email: string
  last_login?: string
  name: string
  username: string
  company_id: number
  company_name?: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) { }

  getAll() {
    return this.http.get<{data: Required<User>[]}>('users').pipe(
      mergeMap(({data}) => this.setCompany(data))
    )
  }

  getOne(id: number) {
    return this.http.get<{data: Required<User>}>(`users/${id}`).pipe(
      mergeMap(({data}) => this.setCompany([data])),
      map(data => data[0])
    )
  }

  update(user: Partial<User>, id: number) {
    return this.http.put<{data: User}>(`users/${id}`, {user}).pipe(
      map(({data}) => data)
    )
  }

  create(user: User) {
    user.last_login = ''
    return this.http.post<{data: Required<User>}>(`users`, {user}).pipe(
      mergeMap(({data}) => this.setCompany([data])),
      map(data => data[0])
    )
  }

  delete(id: number) {
    return this.http.delete(`users/${id}`)
  }

  private setCompany(users: Required<User>[]) {
    const requests = users.map(
      (user) => this.companyService.getOne(user.company_id).pipe(
        map((data) => ({...user, company_name: data.name}))
      )
    )
    return zip(...requests)
  }
}
