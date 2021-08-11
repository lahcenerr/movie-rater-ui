import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'auth'}
];

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AuthModule,
    MainModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
