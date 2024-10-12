import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserRoleComponent } from './add-user-role.component';


describe('AddRolesComponent', () => {
  let component: AddUserRoleComponent;
  let fixture: ComponentFixture<AddUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
