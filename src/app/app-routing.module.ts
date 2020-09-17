import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {PolicyListComponent} from './components/policy-list/policy-list.component';
import {PolicyCreateComponent} from './components/policy-create/policy-create.component';
import {PolicyComponent} from './components/policy/policy.component';
import {AdminGuard} from './admin/admin.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'policies', component: PolicyListComponent, canActivate: [AdminGuard]},
  { path: 'policy/:id', component: PolicyComponent, canActivate: [AdminGuard]},
  { path: 'policy-create', component: PolicyCreateComponent, canActivate: [AdminGuard]},
  { path: 'reactive-search', loadChildren: () => import('./reactive-search/reactive-search.module')
      .then(m => m.ReactiveSearchModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
