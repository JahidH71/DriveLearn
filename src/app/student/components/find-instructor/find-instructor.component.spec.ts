import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindInstructorComponent } from './find-instructor.component';

describe('FindInstructorComponent', () => {
  let component: FindInstructorComponent;
  let fixture: ComponentFixture<FindInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindInstructorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
