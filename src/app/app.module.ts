import { BrowserModule } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { RoutingModule } from '@app/modules/routing/routing.module'
// login component
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'

// task component
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button'

import { AppComponent } from '@app/app.component'
import { TasksComponent } from '@app/components/principal/tasks/tasks.component'
import { UsersComponent } from '@app/components/principal/users/users.component'
import { LoginComponent } from '@app/components/login/login.component'
import { NotFoundComponent } from '@app/components/not-found/not-found.component'
import { PrincipalComponent } from '@app/components/principal/principal.component'
import { DetailComponent } from '@app/components/detail/detail.component'
import { TitleComponent } from '@app/components/shared/title/title.component'

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    UsersComponent,
    LoginComponent,
    NotFoundComponent,
    PrincipalComponent,
    DetailComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
