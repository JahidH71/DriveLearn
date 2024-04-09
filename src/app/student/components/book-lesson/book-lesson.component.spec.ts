import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLessonComponent } from './book-lesson.component';

describe('BookLessonComponent', () => {
  let component: BookLessonComponent;
  let fixture: ComponentFixture<BookLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookLessonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
