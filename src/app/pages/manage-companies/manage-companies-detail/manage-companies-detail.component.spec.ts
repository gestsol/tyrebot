import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompaniesDetailComponent } from './manage-companies-detail.component';

describe('ManageCompaniesDetailComponent', () => {
  let component: ManageCompaniesDetailComponent;
  let fixture: ComponentFixture<ManageCompaniesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCompaniesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCompaniesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
