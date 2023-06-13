import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSectorsComponent } from './admin-sectors.component';

describe('AdminSectorsComponent', () => {
  let component: AdminSectorsComponent;
  let fixture: ComponentFixture<AdminSectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSectorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
