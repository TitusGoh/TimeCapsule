import { TestBed } from '@angular/core/testing';
import { PricingComponent } from './pricing.component';
describe('PricingComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PricingComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PricingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=pricing.component.spec.js.map