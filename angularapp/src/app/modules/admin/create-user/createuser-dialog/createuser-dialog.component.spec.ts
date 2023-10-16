import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateuserDialogComponent } from './createuser-dialog.component';

describe('CreateuserDialogComponent', () => {
  let component: CreateuserDialogComponent;
  let fixture: ComponentFixture<CreateuserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateuserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateuserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
