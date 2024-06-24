import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FeaturesComponent = class FeaturesComponent {
    constructor(router) {
        this.router = router;
    }
    navigateToCreate() {
        //this.router.navigate(['auth/google']);
        window.location.href = 'http://localhost:8080/auth/google';
    }
};
FeaturesComponent = __decorate([
    Component({
        selector: 'app-features',
        templateUrl: './features.component.html',
        styleUrl: './features.component.css'
    })
], FeaturesComponent);
export { FeaturesComponent };
//# sourceMappingURL=features.component.js.map