import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaTokenizationComponent } from './list-ta-tokenization.component';

describe('ListTaTokenizationComponent', () => {
  let component: ListTaTokenizationComponent;
  let fixture: ComponentFixture<ListTaTokenizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTaTokenizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTaTokenizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
