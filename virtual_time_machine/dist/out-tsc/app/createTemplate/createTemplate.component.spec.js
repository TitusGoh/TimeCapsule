import { TestBed } from '@angular/core/testing';
import { createTemplateComponent } from './createTemplate.component';
describe('createTemplateComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [createTemplateComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(createTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=createTemplate.component.spec.js.map