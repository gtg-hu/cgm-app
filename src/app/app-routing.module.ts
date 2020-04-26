import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainFrameComponent } from './main-frame/main-frame.component';

const routes: Routes = [
{path: '', component: MainFrameComponent, outlet: 'main-frame'},
{path: 'search', component: MainFrameComponent, outlet: 'main-frame'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
