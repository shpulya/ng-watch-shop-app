import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchDetailComponent } from './watch-detail.component';

describe('ItemDetailComponent', () => {
    let component: WatchDetailComponent;
    let fixture: ComponentFixture<WatchDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WatchDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WatchDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
