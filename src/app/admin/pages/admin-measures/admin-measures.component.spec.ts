import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMeasuresComponent } from './admin-measures.component';

describe('AdminMeasuresComponent', () => {
  let component: AdminMeasuresComponent;
  let fixture: ComponentFixture<AdminMeasuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMeasuresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
