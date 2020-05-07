import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UploadComponent } from './upload/upload.component';
import { LinkComponent } from './link/link.component';


const routes: Routes = [
  { path: 'list/:user_id', component: ListComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'link', component: LinkComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
