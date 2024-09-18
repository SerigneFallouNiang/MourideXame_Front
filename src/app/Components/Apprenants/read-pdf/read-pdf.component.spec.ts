import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPDFComponent } from './read-pdf.component';

describe('ReadPDFComponent', () => {
  let component: ReadPDFComponent;
  let fixture: ComponentFixture<ReadPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadPDFComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
