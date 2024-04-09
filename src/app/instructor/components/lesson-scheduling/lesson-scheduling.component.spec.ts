import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonSchedulingComponent } from './lesson-scheduling.component';

describe('LessonSchedulingComponent', () => {
  let component: LessonSchedulingComponent;
  let fixture: ComponentFixture<LessonSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonSchedulingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
