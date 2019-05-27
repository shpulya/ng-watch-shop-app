import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchesComponent } from './watches.component';

describe('ItemsComponent', () => {
    let component: WatchesComponent;
    let fixture: ComponentFixture<WatchesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WatchesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WatchesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
