import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public startLoading(): void {
        this.loading$.next(true);
    }

    public stopLoading(): void {
        this.loading$.next(false);
    }
}
