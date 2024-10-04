import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreAdminComponent } from './livres.component';

describe('CategoriesComponent', () => {
  let component: LivreAdminComponent;
  let fixture: ComponentFixture<LivreAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivreAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
