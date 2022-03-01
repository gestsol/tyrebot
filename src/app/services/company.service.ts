import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Company {
  id?: number
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private subCompanies = new BehaviorSubject<Company[]>([]);
  companies$ = this.subCompanies.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<{data: Required<Company>[]}>('companies').pipe(
      map(({data}) => {
        this.subCompanies.next(data)
        return data
      })
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

  create(company: Company) {
    return this.http.post<{data: Required<Company>}>(`companies`, {company}).pipe(
      map(({data}) => data)
    )
  }

  delete(id: number) {
    return this.http.delete(`companies/${id}`)
  }
}
