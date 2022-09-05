import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: 'sign', component: LoginComponent},
  {path: 'users', component: ListUsersComponent},
  {path: 'edit/:id', component: LoginComponent},
  {path: 'notfound', component: NotFoundComponent},
  {path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
