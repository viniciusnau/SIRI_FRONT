import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSendEmailComponent } from './admin-send-email.component';

describe('AdminSendEmailComponent', () => {
  let component: AdminSendEmailComponent;
  let fixture: ComponentFixture<AdminSendEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSendEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
