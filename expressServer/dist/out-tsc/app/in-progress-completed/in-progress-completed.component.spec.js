import { TestBed } from '@angular/core/testing';
import { InProgressCompletedComponent } from './in-progress-completed.component';
describe('InProgresCompletedComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InProgressCompletedComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(InProgressCompletedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=in-progress-completed.component.spec.js.map