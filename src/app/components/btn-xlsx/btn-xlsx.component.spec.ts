import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnXlsxComponent } from './btn-xlsx.component';

describe('BtnXlsxComponent', () => {
  let component: BtnXlsxComponent;
  let fixture: ComponentFixture<BtnXlsxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnXlsxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnXlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
