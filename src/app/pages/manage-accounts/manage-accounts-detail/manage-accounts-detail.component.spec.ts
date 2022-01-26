import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountsDetailComponent } from './manage-accounts-detail.component';

describe('ManageAccountsDetailComponent', () => {
  let component: ManageAccountsDetailComponent;
  let fixture: ComponentFixture<ManageAccountsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAccountsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
