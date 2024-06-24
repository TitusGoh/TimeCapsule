import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { createTemplateComponent } from './createTemplate/createTemplate.component';
import { InProgressCompletedComponent } from './in-progress-completed/in-progress-completed.component';
import { FeaturesComponent } from './features/features.component';
import { PricingComponent } from './pricing/pricing.component';
import { CreatecapsuleComponent } from './createcapsule/createcapsule.component';
import { ContactComponent } from './contact/contact.component';
import { SinglecapsuleComponent } from './singlecapsule/singlecapsule.component';
import { OpenpageComponent } from './openpage/openpage.component';
import { OpencapsuleComponent } from './opencapsule/opencapsule.component';
const routes = [
    { path: '', component: WelcomepageComponent },
    { path: 'create', component: createTemplateComponent },
    { path: 'view', component: InProgressCompletedComponent },
    { path: 'features', component: FeaturesComponent },
    { path: 'pricing', component: PricingComponent },
    { path: 'createCapsule', component: CreatecapsuleComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'view/:capsuleID', component: SinglecapsuleComponent },
    { path: 'openCapsulePage', component: OpenpageComponent },
    { path: 'openCapsulePage/:capsuleID', component: OpencapsuleComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map