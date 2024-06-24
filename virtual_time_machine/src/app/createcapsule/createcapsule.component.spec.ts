import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecapsuleComponent } from './createcapsule.component';

describe('CreatecapsuleComponent', () => {
  let component: CreatecapsuleComponent;
  let fixture: ComponentFixture<CreatecapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatecapsuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatecapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
