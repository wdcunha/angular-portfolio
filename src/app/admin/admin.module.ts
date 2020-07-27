import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectComponent} from './project/project.component';
import {ProjectCreateComponent} from './project-create-component/project-create.component';
import {ProjectListComponent} from './project-list-component/project-list.component';
import {ProjectUpdateComponent} from './project-update-component/project-update.component';
import {AdminRoutingModule} from './admin-routing.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectUpdateComponent,
    ProjectComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})

export class AdminModule { }
