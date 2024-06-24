import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglecapsuleComponent } from './singlecapsule.component';

describe('SinglecapsuleComponent', () => {
  let component: SinglecapsuleComponent;
  let fixture: ComponentFixture<SinglecapsuleComponent>;

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
