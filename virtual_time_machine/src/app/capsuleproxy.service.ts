import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CapsuleproxyService {
  private isLoggedIn = false;
  private userName = '';

  hostUrl:string = 'https://timecapsuleww2.azurewebsites.net/';

  constructor(private httpClient: HttpClient,
    private router: Router
  ) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401 && error.error && error.error.redirectUrl) {
      // Redirect to the provided URL
      window.location.href = error.error.redirectUrl;
      return throwError('User is not authenticated. Redirecting to login.');
    } else {
      // Handle other errors
      return throwError('An error occurred: ' + error.message);
    }
  }

  getCapsuleList() {
    return this.httpClient.get<any[]>( this.hostUrl + 'capsuleList', { withCredentials: true})
    .pipe(
      catchError(this.handleError)
    );
  }

  getCapsule(capsuleID: string) {
    return this.httpClient.get<any>(this.hostUrl + `capsuleList/${capsuleID}`, { withCredentials: true})
    .pipe(
      catchError(this.handleError)
    );
  }

  createCapsule(formData: FormData) {
    return this.httpClient.post<any>(this.hostUrl + 'capsuleList', formData, { responseType: 'text' as 'json', withCredentials: true})
    .pipe(
      catchError(this.handleError)
    );
  }

  updateCapsule(capsuleID: string, updateData: any) {
    return this.httpClient.put(this.hostUrl + `capsuleList/${capsuleID}`, updateData, {withCredentials: true})
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCapsule(capsuleID: string) {
    return this.httpClient.delete(this.hostUrl + `capsuleList/${capsuleID}`, {withCredentials: true})
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteFile(fileID: string): Observable<any> {
    return this.httpClient.delete<any>(this.hostUrl + `files/${fileID}`, { withCredentials: true })
    .pipe(
      catchError(this.handleError)
    );
  }

  addFilesToCapsule(capsuleID: string, formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.hostUrl + `capsuleList/${capsuleID}/files`, formData, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  login() {
    window.location.href = 'https://timecapsuleww2.azurewebsites.net/auth/google';
  }

  logout() {
    this.httpClient.get(this.hostUrl + 'logout', { withCredentials: true }).subscribe(() => {
      this.isLoggedIn = false;
      this.userName = '';
      this.router.navigate(['/']);
    });
  }

  checkAuthStatus() {
    this.httpClient.get<{ isLoggedIn: boolean, userName: string }>(this.hostUrl + 'checkAuth', { withCredentials: true })
      .subscribe(response => {
        console.log("LOG IN: ", response.isLoggedIn, response.userName);  
        this.isLoggedIn = response.isLoggedIn;
        this.userName = response.userName;
      }, error => {
        console.error("Error fetching auth status:", error);
      });
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

  getUserName() {
    return this.userName;
  }
}
