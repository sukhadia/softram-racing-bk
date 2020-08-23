import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, timeout } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Member } from './types';

const MAX_RETRIES = 3
@Injectable({
  providedIn: 'root'
})
export class AppService {
  api = 'http://localhost:8000/api';
  username: string;

  constructor(private http: HttpClient) { }

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(
        retry(MAX_RETRIES),
        catchError(this.handleError)
      );
  }

  getMemberById(id: number) {
    return this.http
      .post(`${this.api}/memberById`, { id })
      .pipe(
        retry(MAX_RETRIES),
        catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  addMember(memberForm: Member) {
    return this.http
      .post<Member>(`${this.api}/addMember`, memberForm)
      .pipe(
        retry(MAX_RETRIES),
        catchError(this.handleError))
  }

  editMember(memberForm: Member) {
    return this.http
      .post<Member>(`${this.api}/editMember`, memberForm)
      .pipe(
        retry(MAX_RETRIES),
        catchError(this.handleError))
  }

  deleteMember(id: number) {
    return this.http
      .post<any>(`${this.api}/deleteMember`, { id })
      .pipe(
        retry(MAX_RETRIES),
        catchError(this.handleError))
  }

  getTeams() {
    return this.http
      .get(`${this.api}/teams`)
      .pipe(
        retry(MAX_RETRIES),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
