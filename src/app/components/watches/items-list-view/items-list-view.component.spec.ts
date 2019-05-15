import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListViewComponent } from './items-list-view.component';

describe('ItemsListViewComponent', () => {
    let component: ItemsListViewComponent;
    let fixture: ComponentFixture<ItemsListViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemsListViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsListViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
