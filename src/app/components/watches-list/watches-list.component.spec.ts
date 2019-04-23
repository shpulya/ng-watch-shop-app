import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchesListComponent } from './watches-list.component';

describe('WatchesListComponent', () => {
  let component: WatchesListComponent;
  let fixture: ComponentFixture<WatchesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
