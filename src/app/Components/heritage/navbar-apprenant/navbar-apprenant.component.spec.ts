import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarApprenantComponent } from './navbar-apprenant.component';

describe('NavbarApprenantComponent', () => {
  let component: NavbarApprenantComponent;
  let fixture: ComponentFixture<NavbarApprenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarApprenantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarApprenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
