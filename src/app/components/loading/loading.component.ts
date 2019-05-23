import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

    public isLoading$: Observable<boolean> = this.loaderService.isLoading$;

    constructor(
        private loaderService: LoaderService
    ) { }

    public ngOnInit(): void {
    }
}
