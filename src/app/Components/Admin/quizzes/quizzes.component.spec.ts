import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizAdminComponent } from './quizzes.component';
// import { QuizComponent } from './quizzes.component';

// import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let component: QuizAdminComponent;
  let fixture: ComponentFixture<QuizAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
