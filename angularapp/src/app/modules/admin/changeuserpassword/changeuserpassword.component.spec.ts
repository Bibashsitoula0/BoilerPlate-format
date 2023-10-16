import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeuserpasswordComponent } from './changeuserpassword.component';

describe('ChangeuserpasswordComponent', () => {
  let component: ChangeuserpasswordComponent;
  let fixture: ComponentFixture<ChangeuserpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeuserpasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeuserpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
