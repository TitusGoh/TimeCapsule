import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(capsuleProxyService) {
        this.capsuleProxyService = capsuleProxyService;
        this.title = 'virtual-time-capsule';
    }
    loginWithGoogle() {
        this.capsuleProxyService.login();
    }
    logout() {
        this.capsuleProxyService.logout();
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map