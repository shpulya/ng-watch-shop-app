import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WristbandDetailComponent } from './wristband-detail.component';

describe('ItemDetailComponent', () => {
    let component: WristbandDetailComponent;
    let fixture: ComponentFixture<WristbandDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WristbandDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WristbandDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
