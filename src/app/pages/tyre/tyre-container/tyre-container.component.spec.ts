import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreContainerComponent } from './tyre-container.component';

describe('TyreContainerComponent', () => {
  let component: TyreContainerComponent;
  let fixture: ComponentFixture<TyreContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TyreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
