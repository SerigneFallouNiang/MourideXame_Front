import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapitreAdminComponent } from './chapitres.component';

describe('CategoriesComponent', () => {
  let component: ChapitreAdminComponent;
  let fixture: ComponentFixture<ChapitreAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapitreAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChapitreAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
