import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, catchError, throwError, BehaviorSubject } from 'rxjs';
import { Customer } from '../interface/customer';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  user = new BehaviorSubject<any>(null);
  currentUser = this.user.asObservable();
  public url:string = 'http://localhost:3002';

  constructor(private _http:HttpClient) { }
  findCustomer(email: string): Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(this.url + "/customers/" + email, requestOptions).pipe(
      map(res => JSON.parse(res) as Customer),
      retry(3),
      catchError(this.handleError))
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=> new Error(error.message))
  }

  updateStatus(user: any){ this.user.next(user); }
}
