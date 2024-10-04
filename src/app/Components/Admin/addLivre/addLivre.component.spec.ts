import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLivresComponent } from './addLivre.component';

describe('AddLivresComponent', () => {
  let component: AddLivresComponent;
  let fixture: ComponentFixture<AddLivresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLivresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLivresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
