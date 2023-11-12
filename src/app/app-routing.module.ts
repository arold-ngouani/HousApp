import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  {
    path:'', loadChildren: () => import('./house/house.module')
    .then(m => m.HouseModule), canActivate: [AuthGuard]
  },
  {
    path:'auth', loadChildren: () => import('./auth/auth.module')
    .then(m => m.AuthModule)
  },
  {
    path:'admin', loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule), canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
