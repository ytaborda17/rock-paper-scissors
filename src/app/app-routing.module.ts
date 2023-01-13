import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/services';
import { HomeComponent, CardSelectorComponent } from './pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular';

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
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    CardSelectorComponent,
  ]
})
export class AppRoutingModule { }