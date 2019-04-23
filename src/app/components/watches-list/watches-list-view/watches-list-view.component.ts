import {Component, Input, OnInit} from '@angular/core';
import {IWatch} from '../../../app.models';

@Component({
    selector: 'app-watches-list-view',
    templateUrl: './watches-list-view.component.html',
    styleUrls: ['./watches-list-view.component.scss']
})
export class WatchesListViewComponent implements OnInit {
    @Input() public readonly watch!: IWatch;
    public orderByVal!: string;


    constructor() {
    }

    public ngOnInit(): void {
    }

    public addWatchToCart(id: number): void {

    }
}
