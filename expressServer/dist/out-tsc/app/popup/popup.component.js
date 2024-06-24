import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PopupComponent = class PopupComponent {
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
    onNoClick() {
        this.dialogRef.close();
    }
};
PopupComponent = __decorate([
    Component({
        selector: 'app-popup',
        templateUrl: './popup.component.html',
        styleUrl: './popup.component.css'
    })
], PopupComponent);
export { PopupComponent };
//# sourceMappingURL=popup.component.js.map