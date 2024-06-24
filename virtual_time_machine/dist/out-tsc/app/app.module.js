import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { createTemplateComponent } from './createTemplate/createTemplate.component';
import { InProgressCompletedComponent } from './in-progress-completed/in-progress-completed.component';
import { FeaturesComponent } from './features/features.component';
import { PricingComponent } from './pricing/pricing.component';
import { CreatecapsuleComponent } from './createcapsule/createcapsule.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { SinglecapsuleComponent } from './singlecapsule/singlecapsule.component';
import { CapsuleproxyService } from './capsuleproxy.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { OpencapsuleComponent } from './opencapsule/opencapsule.component';
import { OpenpageComponent } from './openpage/openpage.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            WelcomepageComponent,
            createTemplateComponent,
            InProgressCompletedComponent,
            FeaturesComponent,
            PricingComponent,
            CreatecapsuleComponent,
            ContactComponent,
            SinglecapsuleComponent,
            OpencapsuleComponent,
            OpenpageComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            HttpClientModule,
            MatTableModule,
            MatSortModule,
            MatToolbarModule,
            MatIconModule,
            MatMenuModule,
            MatButtonModule,
            FormsModule
        ],
        providers: [CapsuleproxyService, provideAnimationsAsync()],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map