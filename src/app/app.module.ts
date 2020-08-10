import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {AdminModule} from './admin/admin.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {data} from '../environments/firebaseConfig';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { PolicyCreateComponent } from './components/policy-create/policy-create.component';
import { PolicyComponent } from './components/policy/policy.component';
import {BootstrapIconsModule} from 'ng-bootstrap-icons';
import {allIcons} from 'ng-bootstrap-icons/icons';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PolicyListComponent,
    PolicyCreateComponent,
    PolicyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AdminModule,
    AngularFireModule.initializeApp(data.firebaseConfig),
    AngularFireAuthModule,
    BootstrapIconsModule.pick(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
