import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferTaTokenizationComponent } from './transfer-ta-tokenization.component';

describe('TransferTaTokenizationComponent', () => {
  let component: TransferTaTokenizationComponent;
  let fixture: ComponentFixture<TransferTaTokenizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferTaTokenizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferTaTokenizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
