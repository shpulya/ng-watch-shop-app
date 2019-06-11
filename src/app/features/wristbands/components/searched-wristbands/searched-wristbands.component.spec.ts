import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedWristbandsComponent } from './searched-wristbands.component';

describe('SearchedItemsComponent', () => {
    let component: SearchedWristbandsComponent;
    let fixture: ComponentFixture<SearchedWristbandsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SearchedWristbandsComponent ]
        })
    .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchedWristbandsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
