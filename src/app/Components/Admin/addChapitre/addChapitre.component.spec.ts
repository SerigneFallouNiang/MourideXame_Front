import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddChapitresComponent } from './addChapitre.component';

describe('AddLivresComponent', () => {
  let component: AddChapitresComponent;
  let fixture: ComponentFixture<AddChapitresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChapitresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddChapitresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
