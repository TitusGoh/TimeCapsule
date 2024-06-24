import { TestBed } from '@angular/core/testing';
import { SinglecapsuleComponent } from './singlecapsule.component';
describe('SinglecapsuleComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SinglecapsuleComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(SinglecapsuleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=singlecapsule.component.spec.js.map