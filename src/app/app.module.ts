import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { WatchesModule } from './features/watches/watches.module';
import { WristbandsModule } from './features/wristbands/wristbands.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CoreModule,
        WatchesModule,
        WristbandsModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
