import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';
import { ListService } from './list/list.service';
import { UserIdService } from './user-id.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    UploadComponent
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
    UploadService,
    ListService,
    UserIdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
