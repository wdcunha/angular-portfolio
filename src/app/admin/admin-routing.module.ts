import {NgModule} from '@angular/core';
import {ProjectComponent} from './project/project.component';
import {ProjectListComponent} from './project-list-component/project-list.component';
import {ProjectCreateComponent} from './project-create-component/project-create.component';
import {ProjectUpdateComponent} from './project-update-component/project-update.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminGuard} from './admin.guard';

const routes: Routes = [
  {
    path: 'admin', component: ProjectComponent, children: [
      {
        path: 'list', component: ProjectListComponent, canActivate: [AdminGuard]
      },
      {
        path: 'create', component: ProjectCreateComponent, canActivate: [AdminGuard]
      },
      {
        path: 'update', component: ProjectUpdateComponent, canActivate: [AdminGuard]
      },
      {
        path: 'login', component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}
