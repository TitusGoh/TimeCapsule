import { TestBed } from '@angular/core/testing';
import { FeaturesComponent } from './features.component';
describe('FeaturesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FeaturesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(FeaturesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=features.component.spec.js.map