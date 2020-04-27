import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { UploadComponent } from './upload/upload.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UploadService } from './upload/upload.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    UploadComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
