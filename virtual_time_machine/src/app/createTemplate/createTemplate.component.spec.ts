import { ComponentFixture, TestBed } from '@angular/core/testing';

import { createTemplateComponent } from './createTemplate.component';

describe('createTemplateComponent', () => {
  let component: createTemplateComponent;
  let fixture: ComponentFixture<createTemplateComponent>;

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
