import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeViewMenuComponent } from './mode-view-menu.component';

describe('ModeViewMenuComponent', () => {
  let component: ModeViewMenuComponent;
  let fixture: ComponentFixture<ModeViewMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeViewMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeViewMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
