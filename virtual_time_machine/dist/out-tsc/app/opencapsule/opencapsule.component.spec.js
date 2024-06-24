import { TestBed } from '@angular/core/testing';
import { OpencapsuleComponent } from './opencapsule.component';
describe('OpencapsuleComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OpencapsuleComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(OpencapsuleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=opencapsule.component.spec.js.map