import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWrapperTokenizationComponent } from './list-wrapper-tokenization.component';

describe('ListWrapperTokenizationComponent', () => {
  let component: ListWrapperTokenizationComponent;
  let fixture: ComponentFixture<ListWrapperTokenizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWrapperTokenizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWrapperTokenizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
