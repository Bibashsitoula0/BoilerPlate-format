import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalyearAccessComponent } from './fiscalyear-access.component';

describe('FiscalyearAccessComponent', () => {
  let component: FiscalyearAccessComponent;
  let fixture: ComponentFixture<FiscalyearAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalyearAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiscalyearAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
