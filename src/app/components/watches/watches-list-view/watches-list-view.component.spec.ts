import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchesListViewComponent } from './watches-list-view.component';

describe('WatchesListViewComponent', () => {
  let component: WatchesListViewComponent;
  let fixture: ComponentFixture<WatchesListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchesListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchesListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
