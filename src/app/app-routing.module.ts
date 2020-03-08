import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgxDynamicFormComponent } from './ng-dynamic-form/ngx-dynamic-form/ngx-dynamic-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { MyChartComponent } from './chart/chart.component';


const routes: Routes = [
  { path: 'chart', component: MyChartComponent },
  { path: 'reactive-form', component: ReactiveFormComponent },
  { path: 'ng-dynamic', component: NgxDynamicFormComponent },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
