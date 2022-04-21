import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvoiceTokenComponent } from './list-invoice-token.component';

describe('ListInvoiceTokenComponent', () => {
  let component: ListInvoiceTokenComponent;
  let fixture: ComponentFixture<ListInvoiceTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInvoiceTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInvoiceTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
