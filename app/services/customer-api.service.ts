import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, retry, catchError } from 'rxjs';
const api = 'http://localhost:3002'
@Injectable({
  providedIn: 'root'
})
export class CustomerAPIService {
  constructor(private http: HttpClient) { }
  signupUser(userData: any): any {
    return this.http.post<any>(`${api}/customers`, userData).pipe(
      retry(3),
      catchError(this.handleError)
    );;
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}