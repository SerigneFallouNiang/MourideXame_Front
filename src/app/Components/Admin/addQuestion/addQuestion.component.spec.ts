import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddQuestionsComponent } from './addQuestion.component';

describe('AddLivresComponent', () => {
  let component: AddQuestionsComponent;
  let fixture: ComponentFixture<AddQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
