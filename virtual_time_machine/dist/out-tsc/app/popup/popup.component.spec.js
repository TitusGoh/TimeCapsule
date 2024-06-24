import { TestBed } from '@angular/core/testing';
import { PopupComponent } from './popup.component';
describe('PopupComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PopupComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=popup.component.spec.js.map