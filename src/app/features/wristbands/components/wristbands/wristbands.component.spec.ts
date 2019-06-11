import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WristbandsComponent } from './wristbands.component';

describe('ItemsComponent', () => {
    let component: WristbandsComponent;
    let fixture: ComponentFixture<WristbandsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WristbandsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WristbandsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
