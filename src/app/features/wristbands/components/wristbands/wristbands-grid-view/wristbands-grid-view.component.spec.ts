import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WristbandsGridViewComponent } from './wristbands-grid-view.component';

describe('ItemsGridViewComponent', () => {
    let component: WristbandsGridViewComponent;
    let fixture: ComponentFixture<WristbandsGridViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WristbandsGridViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WristbandsGridViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
