import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { DialogModule } from 'primeng/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    HttpClientModule
  ],
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
         options: {
        darkModeSelector: 'white', // ใช้ตาม system

      }
      }

    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
