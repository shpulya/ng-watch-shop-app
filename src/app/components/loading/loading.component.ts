import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})

export class LoadingComponent implements OnInit {

    public hideLoading: boolean = false;

    constructor(
        private loaderService: LoaderService
    ) {}

    public ngOnInit(): void {
        this.loaderService.loading$.subscribe((loading: boolean) => {
            this.hideLoading = !loading;
        });
    }
}
