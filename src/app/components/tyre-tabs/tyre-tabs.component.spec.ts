import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreTabsComponent } from './tyre-tabs.component';

describe('TyreTabsComponent', () => {
  let component: TyreTabsComponent;
  let fixture: ComponentFixture<TyreTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TyreTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
