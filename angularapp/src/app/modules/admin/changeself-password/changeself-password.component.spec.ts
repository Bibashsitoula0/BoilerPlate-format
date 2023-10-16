import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeselfPasswordComponent } from './changeself-password.component';

describe('ChangeselfPasswordComponent', () => {
  let component: ChangeselfPasswordComponent;
  let fixture: ComponentFixture<ChangeselfPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeselfPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeselfPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
