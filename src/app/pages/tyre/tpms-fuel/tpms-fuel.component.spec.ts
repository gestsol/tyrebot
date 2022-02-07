import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpmsFuelComponent } from './tpms-fuel.component';

describe('TpmsFuelComponent', () => {
  let component: TpmsFuelComponent;
  let fixture: ComponentFixture<TpmsFuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpmsFuelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpmsFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
