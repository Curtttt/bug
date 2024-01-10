import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, retry, throwError } from 'rxjs';
const api ='http://localhost:3002'
@Injectable({
  providedIn: 'root'
})
export class ContactapiService {
  constructor(private http: HttpClient) { }
  ContactUser(userData:any): any{
    return this.http.post<any>(`${api}/contactdata`, userData).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=> new Error(error.message))
  }
}