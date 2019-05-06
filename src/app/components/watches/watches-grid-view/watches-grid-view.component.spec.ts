import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchesGridViewComponent } from './watches-grid-view.component';

describe('WatchesGridViewComponent', () => {
    let component: WatchesGridViewComponent;
    let fixture: ComponentFixture<WatchesGridViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WatchesGridViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WatchesGridViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
