import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProtocolsComponent } from './admin-protocols.component';

describe('AdminProtocolsComponent', () => {
  let component: AdminProtocolsComponent;
  let fixture: ComponentFixture<AdminProtocolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProtocolsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProtocolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
