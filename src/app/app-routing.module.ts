import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
