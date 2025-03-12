import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import {  AuthGuard  } from './guards/auth.guard'


export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent,  canActivate: [AuthGuard]  },
  { path: 'register', component: RegisterComponent,  canActivate: [AuthGuard]  },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/create', component: PostFormComponent }, // Créer un post
  { path: 'posts/:id', component: PostDetailComponent }, // Voir un post
  { path: 'posts/:id/edit', component: PostFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' } // Redirection pour les routes inconnues
];