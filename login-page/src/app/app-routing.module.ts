import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: 'save', component: LoginComponent},
  {path: 'users', component: ListUsersComponent},
  {path: 'save/:id', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
