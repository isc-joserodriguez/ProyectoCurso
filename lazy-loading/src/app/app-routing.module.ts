import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
     {
       path: 'battle',
       loadChildren: './modules/battle/battle.module#BattleModule'
     },
     {
       path: 'search',
       loadChildren: './modules/search/search.module#SearchModule'
     }
    ]
  },
  {  path: '**', redirectTo: 'battle' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
