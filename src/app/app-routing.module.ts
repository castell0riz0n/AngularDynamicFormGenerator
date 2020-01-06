import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgxDynamicFormComponent } from './ng-dynamic-form/ngx-dynamic-form/ngx-dynamic-form.component';


const routes: Routes = [
  { path: 'ng-dynamic', component: NgxDynamicFormComponent },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
