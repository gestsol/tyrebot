import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompaniesListComponent } from './manage-companies-list.component';

describe('ManageCompaniesListComponent', () => {
  let component: ManageCompaniesListComponent;
  let fixture: ComponentFixture<ManageCompaniesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCompaniesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCompaniesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
