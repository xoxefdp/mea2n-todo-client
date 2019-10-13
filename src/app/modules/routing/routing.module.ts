import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from '@app/components/login/login.component'
import { TasksComponent } from '@app/components/principal/tasks/tasks.component'
import { UsersComponent } from '@app/components/principal/users/users.component'
import { NotFoundComponent } from '@app/components/not-found/not-found.component'

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'users', component: UsersComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
