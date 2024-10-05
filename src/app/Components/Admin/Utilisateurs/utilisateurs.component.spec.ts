import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilisateurComponent } from './utilisateurs.component';

describe('CategoriesComponent', () => {
  let component: UtilisateurComponent;
  let fixture: ComponentFixture<UtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
