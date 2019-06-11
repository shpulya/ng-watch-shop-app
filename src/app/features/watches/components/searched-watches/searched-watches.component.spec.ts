import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedWatchesComponent } from './searched-watches.component';

describe('SearchedItemsComponent', () => {
    let component: SearchedWatchesComponent;
    let fixture: ComponentFixture<SearchedWatchesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SearchedWatchesComponent ]
        })
    .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchedWatchesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
