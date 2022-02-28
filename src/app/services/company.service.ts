import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface Company {
  id?: number
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<{data: Required<Company>[]}>('companies').pipe(
      map(({data}) => data)
    )
  }

  getOne(id: number) {
    return this.http.get<{data: Company}>(`companies/${id}`).pipe(
      map(({data}) => data)
    )
  }

  update(company: Partial<Company>, id: number) {
    return this.http.put<{data: Company}>(`companies/${id}`, {company}).pipe(
      map(({data}) => data)
    )
  }
}
