import { __decorate } from "tslib";
import { Component } from '@angular/core';
let OpenpageComponent = class OpenpageComponent {
    constructor(capsuleProxyService, router) {
        this.capsuleProxyService = capsuleProxyService;
        this.router = router;
        this.openCapsules = [];
        this.displayedColumns = ['capsuleID', 'name', 'description', 'createdDate', 'openDate'];
    }
    ngOnInit() {
        this.getCapsules();
    }
    getCapsules() {
        this.capsuleProxyService.getCapsuleList()
            .subscribe((lists) => {
            this.openCapsules = lists.filter(capsule => capsule.capsule.completed && this.isOpenDateAfterToday(capsule.capsule.openDate));
        }, (error) => {
            console.error('Error fetching lists:', error);
        });
    }
    isOpenDateAfterToday(openDate) {
        const today = new Date();
        const openDateObj = new Date(openDate);
        return openDateObj <= today;
    }
    viewCapsuleFiles(capsuleID) {
        this.router.navigate(['/openCapsulePage', capsuleID]);
    }
};
OpenpageComponent = __decorate([
    Component({
        selector: 'app-openpage',
        templateUrl: './openpage.component.html',
        styleUrl: './openpage.component.css'
    })
], OpenpageComponent);
export { OpenpageComponent };
//# sourceMappingURL=openpage.component.js.map