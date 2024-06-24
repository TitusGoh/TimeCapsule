import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
let CapsuleproxyService = class CapsuleproxyService {
    constructor(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this.isLoggedIn = false;
        this.userName = '';
        this.hostUrl = 'http://localhost:8080/';
    }
    handleError(error) {
        if (error.status === 401 && error.error && error.error.redirectUrl) {
            // Redirect to the provided URL
            window.location.href = error.error.redirectUrl;
            return throwError('User is not authenticated. Redirecting to login.');
        }
        else {
            // Handle other errors
            return throwError('An error occurred: ' + error.message);
        }
    }
    getCapsuleList() {
        return this.httpClient.get(this.hostUrl + 'capsuleList', { withCredentials: true })
            .pipe(catchError(this.handleError));
    }
    getCapsule(capsuleID) {
        return this.httpClient.get(this.hostUrl + `capsuleList/${capsuleID}`, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }
    createCapsule(formData) {
        return this.httpClient.post(this.hostUrl + 'capsuleList', formData, { responseType: 'text', withCredentials: true })
            .pipe(catchError(this.handleError));
    }
    updateCapsule(capsuleID, updateData) {
        return this.httpClient.put(this.hostUrl + `capsuleList/${capsuleID}`, updateData, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }
    deleteCapsule(capsuleID) {
        return this.httpClient.delete(this.hostUrl + `capsuleList/${capsuleID}`, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }
    deleteFile(fileID) {
        return this.httpClient.delete(this.hostUrl + `files/${fileID}`, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }
    addFilesToCapsule(capsuleID, formData) {
        return this.httpClient.post(this.hostUrl + `capsuleList/${capsuleID}/files`, formData, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }
    login() {
        window.location.href = 'http://localhost:8080/auth/google'; // Replace with your backend URL
    }
    logout() {
        this.httpClient.get('http://localhost:8080/logout').subscribe(() => {
            this.isLoggedIn = false;
            this.userName = '';
            this.router.navigate(['/']);
        });
    }
    checkAuthStatus() {
        this.httpClient.get('http://localhost:8080/checkAuth').subscribe(response => {
            console.log("LOG IN: ", response.isLoggedIn);
            this.isLoggedIn = response.isLoggedIn;
            this.userName = response.userName;
        });
    }
    isUserLoggedIn() {
        return this.isLoggedIn;
    }
    getUserName() {
        return this.userName;
    }
};
CapsuleproxyService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CapsuleproxyService);
export { CapsuleproxyService };
//# sourceMappingURL=capsuleproxy.service.js.map