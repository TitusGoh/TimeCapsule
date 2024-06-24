import { __decorate } from "tslib";
import { Component } from '@angular/core';
let WelcomepageComponent = class WelcomepageComponent {
    constructor() { }
    loginWithGoogle() {
        // window.location.href = 'https://timecapsuleww2.azurewebsites.net/auth/google';
        window.location.href = 'http://localhost:8080/auth/google';
    }
};
WelcomepageComponent = __decorate([
    Component({
        selector: 'app-welcomepage',
        templateUrl: './welcomepage.component.html',
        styleUrl: './welcomepage.component.css'
    })
], WelcomepageComponent);
export { WelcomepageComponent };
//# sourceMappingURL=welcomepage.component.js.map