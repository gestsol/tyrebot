import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountsListComponent } from './manage-accounts-list.component';

describe('ManageAccountsListComponent', () => {
  let component: ManageAccountsListComponent;
  let fixture: ComponentFixture<ManageAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAccountsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
