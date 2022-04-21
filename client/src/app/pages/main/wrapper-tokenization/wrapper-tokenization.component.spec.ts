import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperTokenizationComponent } from './wrapper-tokenization.component';

describe('WrapperTokenizationComponent', () => {
  let component: WrapperTokenizationComponent;
  let fixture: ComponentFixture<WrapperTokenizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperTokenizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperTokenizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
