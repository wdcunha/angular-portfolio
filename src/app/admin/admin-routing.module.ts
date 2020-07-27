import {NgModule} from '@angular/core';
import {ProjectComponent} from './project/project.component';
import {ProjectListComponent} from './project-list-component/project-list.component';
import {ProjectCreateComponent} from './project-create-component/project-create.component';
import {ProjectUpdateComponent} from './project-update-component/project-update.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: 'admin', component: ProjectComponent, children: [
      {
        path: 'list', component: ProjectListComponent
      },
      {
        path: 'create', component: ProjectCreateComponent
      },
      {
        path: 'update', component: ProjectUpdateComponent
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
