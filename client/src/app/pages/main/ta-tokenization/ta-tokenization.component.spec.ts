import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaTokenizationComponent } from './ta-tokenization.component';

describe('TaTokenizationComponent', () => {
  let component: TaTokenizationComponent;
  let fixture: ComponentFixture<TaTokenizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaTokenizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaTokenizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
