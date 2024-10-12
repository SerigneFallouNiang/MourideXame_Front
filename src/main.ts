/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ToastrComponentlessModule, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


  bootstrapApplication(ToastrComponentlessModule, {
    providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(ToastrModule.forRoot()),
    ],
}).catch((err) => console.error(err));