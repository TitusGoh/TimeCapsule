import { __decorate } from "tslib";
import { Component } from '@angular/core';
let OpencapsuleComponent = class OpencapsuleComponent {
    constructor(capsuleProxyService, route, router) {
        this.capsuleProxyService = capsuleProxyService;
        this.route = route;
        this.router = router;
        this.capsule = {};
        this.files = [];
    }
    ngOnInit() {
        this.getCapsuleInfo();
    }
    getCapsuleInfo() {
        const id = this.route.snapshot.paramMap.get('capsuleID');
        console.log(id);
        if (id) {
            this.capsuleProxyService.getCapsule(id)
                .subscribe((data) => {
                this.capsule = data.capsule;
                this.files = data.files.map((file) => {
                    const thumbnailUrl = this.getThumbnailUrl(file.fileId);
                    return {
                        ...file,
                        thumbnailUrl
                    };
                });
            }, (error) => {
                console.error('Error fetching capsule details:', error);
            });
        }
    }
    getThumbnailUrl(fileId) {
        return `http://localhost:8080/file/${fileId}`;
    }
};
OpencapsuleComponent = __decorate([
    Component({
        selector: 'app-opencapsule',
        templateUrl: './opencapsule.component.html',
        styleUrl: './opencapsule.component.css'
    })
], OpencapsuleComponent);
export { OpencapsuleComponent };
//# sourceMappingURL=opencapsule.component.js.map