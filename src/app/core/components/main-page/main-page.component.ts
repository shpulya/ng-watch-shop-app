import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

    public categories: Array<string> = ['watches', 'wristbands'];

    constructor() { }

    public ngOnInit(): void {
    }

}
