import { __decorate } from "tslib";
import { Component } from '@angular/core';
let createTemplateComponent = class createTemplateComponent {
    constructor(router) {
        this.router = router;
    }
    navigateToCreateCapsule() {
        this.router.navigate(['/createCapsule']);
    }
    ngOnInit() {
    }
    clickEvent() {
        this.router.navigate(['']);
    }
};
createTemplateComponent = __decorate([
    Component({
        selector: 'app-createTemplate',
        templateUrl: './createTemplate.component.html',
        styleUrl: './createTemplate.component.css'
    })
], createTemplateComponent);
export { createTemplateComponent };
//# sourceMappingURL=createTemplate.component.js.map