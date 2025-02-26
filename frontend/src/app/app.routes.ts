import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/create', component: PostFormComponent }, // Créer un post
  { path: 'posts/:id', component: PostDetailComponent }, // Voir un post
  { path: 'posts/:id/edit', component: PostFormComponent }, // Modifier un post
  { path: '**', redirectTo: '' } // Redirection pour les routes inconnues
];