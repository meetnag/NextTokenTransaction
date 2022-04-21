import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferWrapperTokenizationComponent } from './transfer-wrapper-tokenization.component';

describe('TransferWrapperTokenizationComponent', () => {
  let component: TransferWrapperTokenizationComponent;
  let fixture: ComponentFixture<TransferWrapperTokenizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferWrapperTokenizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferWrapperTokenizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
