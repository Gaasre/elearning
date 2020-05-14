import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, fr_FR } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import en from '@angular/common/locales/en';
import { HomeComponent } from './pages/home/home.component';
import { CourseComponent } from './components/course/course.component';
import zh from '@angular/common/locales/zh';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { LearnComponent } from './pages/learn/learn.component';
import { CoursePlayerComponent } from './components/course-player/course-player.component';
import { AuthGuard } from './services/guards/authguard.service';
import { NewCourseComponent } from './pages/formateur/new-course/new-course.component';
import { CourseListComponent } from './pages/formateur/course-list/course-list.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { EditCourseComponent } from './pages/formateur/edit-course/edit-course.component';
import { ProfilComponent } from './pages/formateur/profil/profil.component';

registerLocaleData(zh);

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'course/:id', component: CoursePageComponent },
  { path: 'learn/:id', component: LearnComponent, canActivate: [AuthGuard]},
  { path: 'formateur', component: CourseListComponent, canActivate: [AuthGuard]},
  { path: 'formateur/profil', component: ProfilComponent, canActivate: [AuthGuard]},
  { path: 'formateur/cours/new', component: NewCourseComponent, canActivate: [AuthGuard]},
  { path: 'formateur/cours/edit/:id', component: EditCourseComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    HomeComponent,
    CourseComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CoursePageComponent,
    LearnComponent,
    CoursePlayerComponent,
    NewCourseComponent,
    CourseListComponent,
    SidenavComponent,
    EditCourseComponent,
    ProfilComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    StorageServiceModule
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
