import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WristbandsListViewComponent } from './wristbands-list-view.component';

describe('ItemsListViewComponent', () => {
    let component: WristbandsListViewComponent;
    let fixture: ComponentFixture<WristbandsListViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WristbandsListViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WristbandsListViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
