import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTokenComponent } from './invoice-token.component';

describe('InvoiceTokenComponent', () => {
  let component: InvoiceTokenComponent;
  let fixture: ComponentFixture<InvoiceTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
