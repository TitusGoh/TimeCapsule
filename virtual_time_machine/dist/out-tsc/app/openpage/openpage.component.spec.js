import { TestBed } from '@angular/core/testing';
import { OpenpageComponent } from './openpage.component';
describe('OpenpageComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OpenpageComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(OpenpageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=openpage.component.spec.js.map