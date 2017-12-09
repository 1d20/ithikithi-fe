import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from './lib/interceptors';

import { AppRoutingModule } from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PersonService } from './$services/person/person.service';
import { AuthService} from './$services/person/auth.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './$components/home/home.component';
import { TopMenuComponent } from './$components/top-menu/top-menu.component';
import { BookFormComponent } from './$components/book-form/book-form.component';
import { SearchTrainsFormComponent } from './$components/search-trains-form/search-trains-form.component';
import { AuthComponent } from './$components/auth/auth.component';
import { TrainsComponent } from './$components/trains/trains.component';
import { TrainsTableComponent } from './$components/trains/trains-table/trains-table.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    BookFormComponent,
    SearchTrainsFormComponent,
    AuthComponent,
    TrainsComponent,
    TrainsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxDatatableModule,
    NgbModule.forRoot(),
  ],
  providers: [
    PersonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
