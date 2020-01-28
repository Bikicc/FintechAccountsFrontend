import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticTransactionsComponent } from './automatic-transactions.component';

describe('AutomaticTransactionsComponent', () => {
  let component: AutomaticTransactionsComponent;
  let fixture: ComponentFixture<AutomaticTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomaticTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaticTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
