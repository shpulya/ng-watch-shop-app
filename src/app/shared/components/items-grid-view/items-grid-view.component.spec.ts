import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsGridViewComponent } from './items-grid-view.component';

describe('ItemsGridViewComponent', () => {
    let component: ItemsGridViewComponent;
    let fixture: ComponentFixture<ItemsGridViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemsGridViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsGridViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
