import {Component, OnInit, Input} from '@angular/core';
import {IWatch} from '../../../app.models';

@Component({
    selector: 'app-watches-grid-view',
    templateUrl: './watches-grid-view.component.html',
    styleUrls: ['./watches-grid-view.component.scss']
})
export class WatchesGridViewComponent implements OnInit {
    @Input() public readonly watch!: IWatch;

    constructor() {
    }

    public ngOnInit(): void {
    }

    public addWatchToCart(id: number): void {

    }

}
