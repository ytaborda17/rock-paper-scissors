import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/services';
import { HomeComponent, CardSelectorComponent } from './pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular';
import { environment } from 'src/environments/environment';
import { AngularFireModule} from '@angular/fire/compat'
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DxButtonModule,
    AngularFireModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    AuthGuardService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    CardSelectorComponent,
  ]
})
export class AppRoutingModule { }