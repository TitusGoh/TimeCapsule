import { __decorate } from "tslib";
import { Component } from '@angular/core';
let InProgressCompletedComponent = class InProgressCompletedComponent {
    constructor(capsuleProxyService, router) {
        this.capsuleProxyService = capsuleProxyService;
        this.router = router;
        this.inProgressCapsules = [];
        this.completedCapsules = [];
        this.displayedColumns = ['capsuleID', 'name', 'description', 'createdDate', 'openDate'];
    }
    ngOnInit() {
        this.getCapsules();
    }
    getCapsules() {
        this.capsuleProxyService.getCapsuleList()
            .subscribe((lists) => {
            this.inProgressCapsules = lists.filter(capsule => !capsule.capsule.completed);
            this.completedCapsules = lists.filter(capsule => capsule.capsule.completed && this.isOpenDateBeforeToday(capsule.capsule.openDate));
        }, (error) => {
            console.error('Error fetching lists:', error);
        });
    }
    isOpenDateBeforeToday(openDate) {
        const today = new Date();
        const openDateObj = new Date(openDate);
        return openDateObj > today;
    }
    viewCapsule(capsuleID) {
        this.router.navigate(['/view', capsuleID]);
    }
};
InProgressCompletedComponent = __decorate([
    Component({
        selector: 'app-in-progress-completed',
        templateUrl: './in-progress-completed.component.html',
        styleUrl: './in-progress-completed.component.css'
    })
], InProgressCompletedComponent);
export { InProgressCompletedComponent };
//# sourceMappingURL=in-progress-completed.component.js.map