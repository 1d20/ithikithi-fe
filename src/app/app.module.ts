import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from './lib/interceptors';

import { AppRoutingModule } from './app-routing.module';

import { PersonService } from './$services/person/person.service';
import { AuthService} from './$services/person/auth.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { BookFormComponent } from './book-form/book-form.component';
import { SearchTrainsFormComponent } from './search-trains-form/search-trains-form.component';
import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    BookFormComponent,
    SearchTrainsFormComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
