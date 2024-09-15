import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XassidasListeComponent } from './xassidas-liste.component';

describe('XassidasListeComponent', () => {
  let component: XassidasListeComponent;
  let fixture: ComponentFixture<XassidasListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XassidasListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XassidasListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
